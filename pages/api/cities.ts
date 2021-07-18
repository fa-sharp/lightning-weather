import type { GetStaticProps, NextApiRequest, NextApiResponse } from 'next'
import cityListJson from '../../data/city.list.min.json'
import { CityCombinedDataType, CityDataType } from '../../data/cityDataUtil';

const cityList = cityListJson as CityDataType[];
const citySearchList: CityCombinedDataType[] = cityList.map((city,index) => {
    if (index === 0) console.log("recreating city list");
    
    return {...city,
        combinedName: `${city.name}, ${city.state === "" ? "" : city.state + ", "}${city.country}`};
});


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CityCombinedDataType[]>
) {
    res.status(200).json(citySearchList);
}