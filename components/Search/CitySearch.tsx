import React, { useState } from 'react'
import { CityCombinedDataType, CityDataType, searchCityName } from '../../data/cityDataUtil'

interface CitySearchProps {
    onSubmit: React.FormEventHandler<HTMLButtonElement>;
}

const CitySearch = ({onSubmit}: CitySearchProps) => {

    const [foundCities, setFoundCities] = useState<CityCombinedDataType[]>([]);

    const onCitySearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        
        const citySearchQuery = event.target.value;

        if (!validateCitySearchQuery(citySearchQuery)) {
            setFoundCities([]);
            return;
        }

        setFoundCities(searchCityName(citySearchQuery));
    }


    return (
        <div>
            <input type="search" onChange={onCitySearchChange} name="citySearch" id="citySearch" placeholder="City Name"/>
            <button type="submit" onClick={onSubmit}>Search</button>
            {foundCities.map(city => 
                <div onClick={() => console.log(city.id)} key={city.id}>{city.combinedName}</div>
            )}
        </div>
    )
}

const citySearchRegex = new RegExp(/^[a-zA-Z ,]+$/); // for now, only a-z characters but will need to expand to include accents, etc.
const validateCitySearchQuery = (searchQuery: string) => searchQuery.length > 1 && citySearchRegex.test(searchQuery);

export default CitySearch
