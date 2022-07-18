import type { NextApiRequest, NextApiResponse } from 'next'
import { City } from '../../data/DataTypes';

const CITIES_API_ENDPOINT = process.env.CITIES_API_ENDPOINT
const CITIES_API_KEY = process.env.CITIES_API_KEY || ""

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<City[] | string>
) {
    const { query: { search: searchQuery } } = req;

    if (!searchQuery || typeof searchQuery !== 'string') {
        return res.status(400).send("Error: no search query found");
    }

    try {
        const citiesResponse = await fetchCities(normalizeQuery(searchQuery), 10);
        res.status(200).json(await citiesResponse.json());
    } catch (err) {
        console.error("Error fetching cities from Cities API endpoint: ", err)
        res.status(500).send("Error looking up cities :(");
    }
}

async function fetchCities(searchQuery: string, limit: number) {
    const url = `${CITIES_API_ENDPOINT}?search=${encodeURIComponent(searchQuery)}&top=${limit}`
    const response = await fetch(url, { headers: { CITIES_API_KEY, "User-Agent": "lightning-weather-vercel" }});
    return response;
}

/** Normalize, remove spaces, make lowercase */
function normalizeQuery(str: string) { 
    return str.normalize("NFD").replace(/[\u0300-\u036f]|\s+/g, "").toLowerCase();
}
