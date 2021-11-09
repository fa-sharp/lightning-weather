import sqlite from 'better-sqlite3'
import { City } from '../data/DataTypes'

const db = sqlite('data/cities.db', { fileMustExist: true, verbose: console.log });

/** Search for first 10 matches */
const searchCitiesSQL = db.prepare('SELECT * FROM City WHERE normalized LIKE ? LIMIT 10');

/** 
 * Normalizes search queries to send to database. This is the same normalization function that 
 * was run when creating the cities database. Removes spaces, accents, etc. and makes lowercase 
 */
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]|\s+/g, "").toLowerCase();

/**
 * Normalizes query and searches the city database. Returns array of City matches.
 */
export default (query: string): City[] => {
    const sqlParam = normalize(query) + "%";
    return searchCitiesSQL.all(sqlParam).map(dbCity => ({
        id: dbCity.cityId,
        name: dbCity.name,
        state: dbCity.state,
        country: dbCity.country,
        combinedName: dbCity.combinedName,
        normalized: dbCity.normalized,
        coord: JSON.parse(dbCity.coord)
    }))
}