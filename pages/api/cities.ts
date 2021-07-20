import type { NextApiRequest, NextApiResponse } from 'next'
import cityListJson from '../../data/city.list.formatted.json'
import { CityCombinedDataType } from '../../data/cityDataTypes';

const cityList = cityListJson as CityCombinedDataType[];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CityCombinedDataType[]>
) {
    res.status(200).json(cityList);
}