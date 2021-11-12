import betterSQLite from 'better-sqlite3'
import citiesJSON from '../../data/city.list.formatted.json'
import { readFileSync } from 'fs'

const db = betterSQLite('cities.db');

/** Create the City table */
const createTableSQL = readFileSync('db_scripts/001-cities.sql', 'utf8');
db.exec(createTableSQL);

const numCities = citiesJSON.length;

/** Insert cities into SQLite database from JSON file, 10,000 at a time */
let citiesCursor = 0;
while (citiesCursor < numCities) {
    const citiesToInsert = citiesJSON.slice(citiesCursor, citiesCursor + 10000).map(city => {
        const { id, name, state, country, combinedName, normalized, coord } = city;
        return { id, name, state, country, combinedName, normalized: normalized.replace(/\s+/g, ''), coord: JSON.stringify(coord) }
    })

    const insertCitySQL = db.prepare("INSERT INTO City VALUES (NULL, @id,@name,@state,@country,@combinedName,@normalized,@coord)")
    const insertManyCities = db.transaction(cities => {
        for (let city of cities)
            insertCitySQL.run(city);
    })

    insertManyCities(citiesToInsert);

    citiesCursor += 10000;
}

/** Create an Index on the Normalized column, as we'll be running most search queries on that column */
const createIndexSQL = readFileSync('db_scripts/002-index.sql', 'utf8');
db.exec(createIndexSQL);

db.close()