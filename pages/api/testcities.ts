import type { NextApiRequest, NextApiResponse } from 'next'
import cityListJson from '../../data/city.list.formatted.json'
import { City } from '../../data/DataTypes';

const cityList = cityListJson as City[];

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
        const citySearchQuery = searchQuery as string;
        const foundCities = cityList
            .filter(cityData => cityData.combinedName.toLowerCase().startsWith(citySearchQuery.toLowerCase()))
            .slice(0,9);

        res.status(200).json(foundCities);
    }
}