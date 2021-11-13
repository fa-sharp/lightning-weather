import express from 'express'
import { normalizeQuery, requireAPIKey, validLimit } from './utils.js';
import searchCitiesDB, { lookupNamesDB } from './searchCitiesDB.js';

export const API_KEY = process.env.API_KEY || null; // API Key to secure the server (sort of)
const PORT = process.env.PORT || 3001;
const DEFAULT_LIMIT = "10"; // default max number of cities to return

const app = express();


/** Main route to lookup cities. */
app.get("/lookup", requireAPIKey, (req, res) => {

    const { search, top } = req.query;

    if (!search)
        return res.status(400).send({reason: "Missing query."})

    const normalizedQuery = normalizeQuery(search);
    const limit = (top && validLimit(Number(top))) ? top : DEFAULT_LIMIT;

    try {
        const results = searchCitiesDB(normalizedQuery, limit);
        return res.json(results);
    }
    catch (err) {
        console.error("Error searching for cities in database: ", err);
        return res.status(500).send({ reason: "Error searching for cities :(" })
    }
})

app.get("/lookupNames", requireAPIKey, (req, res) => {
    const { search, top } = req.query;

    if (!search)
        return res.status(400).send({reason: "Missing query."})

    const normalizedQuery = normalizeQuery(search);
    const limit = (top && validLimit(Number(top))) ? top : DEFAULT_LIMIT;

    try {
        const results = lookupNamesDB(normalizedQuery, limit);
        return res.json(results);
    }
    catch (err) {
        console.error("Error searching for cities in database: ", err);
        return res.status(500).send({ reason: "Error searching for cities :(" })
    }
})

const server = app.listen(PORT);
console.log("'Cities API' Express server listening on port " + PORT + "....");


const shutdown = () => {
    console.log("'Cities API' Express server shutting down...");
    server.close(() => process.exit())
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
