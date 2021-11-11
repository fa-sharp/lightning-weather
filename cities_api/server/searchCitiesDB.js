import sqlite from 'better-sqlite3'

const isProduction = process.env.NODE_ENV === 'production'

const db = sqlite('server/cities.db', { fileMustExist: true, verbose: isProduction ? null : console.log });
console.log("Connected to SQLite database.")

/** SQL command to search for cities */
const searchCitiesSQL = db.prepare('SELECT * FROM City WHERE normalized LIKE ? LIMIT ?');

/**
 * Searches the city database. (Careful to normalize and validate query beforehand) Returns array of City matches.
 */
export default (query, limit) => {
    return searchCitiesSQL.all(query + "%", limit).map(dbCity => ({
        id: dbCity.cityId,
        name: dbCity.name,
        state: dbCity.state,
        country: dbCity.country,
        combinedName: dbCity.combinedName,
        normalized: dbCity.normalized,
        coord: JSON.parse(dbCity.coord)
    }))
}