import type { NextApiRequest, NextApiResponse } from 'next'
import { City } from '../../data/DataTypes';
import searchCitiesDB from '../../data/searchCitiesDB';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<City[] | string>
) {
    const { query: { search: searchQuery } } = req;

    if (!searchQuery) {
        res.status(400).send("Error: no search query found");
    } else if (searchQuery.length < 2) {
        res.status(400).send("Error: search query must be at least two characters")
    } else {
        const foundCities = searchCitiesDB(searchQuery as string);
        res.status(200).json(foundCities);
    }
}