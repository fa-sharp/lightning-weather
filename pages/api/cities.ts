import type { NextApiRequest, NextApiResponse } from 'next'
import cityListJson from '../../data/city.list.formatted.json'
import { City } from '../../data/DataTypes';

const cityList = cityListJson as City[];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<City[]>
) {
    res.status(200).json(cityList);
}