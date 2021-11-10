import type { NextApiRequest, NextApiResponse } from 'next'
import { City } from '../../data/DataTypes';

const CITIES_API_ENDPOINT = process.env.CITIES_API_ENDPOINT
const CITIES_API_KEY = process.env.CITIES_API_KEY

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<City[] | string>
) {
    const { query: { search: searchQuery } } = req;

    if (!searchQuery) {
        return res.status(400).send("Error: no search query found");
    }

    try {
        const citiesResponse = await fetchCities(searchQuery as string, 10);
        res.status(200).json(await citiesResponse.json());
    } catch (err) {
        console.error("Error fetching cities from Cities API endpoint: ", err)
        res.status(500).send("Error looking up cities :(");
    }
}

async function fetchCities(searchQuery: string, limit: number) {
    const url = `${CITIES_API_ENDPOINT}?search=${searchQuery}&top=${limit}&api_id=${CITIES_API_KEY}`
    const response = await fetch(url);
    return response;
}