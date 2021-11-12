import { API_KEY } from "./index.js";

/** Middleware to check for API key in headers */
export const requireAPIKey = (req, res, next) => {

    // If no API key setup, skip check
    if (!API_KEY)
        return next()

    const { cities_api_key } = req.headers;

    if (cities_api_key === API_KEY)
        next()
    else
        res.status(403).send({reason: "No Ma'am! Invalid API key!"})
}

/** 
 * Normalizes search queries to send to database. This is the same normalization function that 
 * was run when creating the cities database. Removes spaces, accents, etc. and makes lowercase 
 */
export const normalizeQuery = str => str.normalize("NFD").replace(/[\u0300-\u036f]|\s+/g, "").toLowerCase();

/**
 * Checks that the limit parameter is an integer between 0 and 50
 */
export const validLimit = limit => Number.isInteger(limit) && 0 < limit && limit < 50