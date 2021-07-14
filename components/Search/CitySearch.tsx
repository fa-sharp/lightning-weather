import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react'
import { CityCombinedDataType, CityDataType, searchCityName } from '../../data/cityDataUtil'
import styles from './CitySearch.module.scss'

interface CitySearchProps {
    onSubmit: FormEventHandler<HTMLButtonElement>;
}

const CitySearch = ({ onSubmit }: CitySearchProps) => {

    const [foundCities, setFoundCities] = useState<CityCombinedDataType[]>([]);
    const [selectedCity, setSelectedCity] = useState<CityCombinedDataType | null>(null);
    const citySearchRef = useRef<HTMLInputElement>(null);

    const onCitySearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        
        const citySearchQuery = event.target.value;

        if (!validateCitySearchQuery(citySearchQuery)) {
            setFoundCities([]);
            return;
        }

        setFoundCities(searchCityName(citySearchQuery));
    }

    const onCitySelected = (city: CityCombinedDataType) => {
        setSelectedCity(city);
        if (citySearchRef.current)
            citySearchRef.current.value = city.combinedName;
        setFoundCities([]);
    }


    return (
        <div className={styles.citySearch}>
            <input ref={citySearchRef} type="search" onChange={onCitySearchChange} name="citySearch" id="citySearch" placeholder="City Name"/>
            <button type="submit" onClick={onSubmit}>Search</button>
            {foundCities.length !== 0 && <div className={styles.citySearchItemList}>
                {foundCities.map(city =>
                    <button className={styles.citySearchItem}
                        key={city.id}
                        onClick={() => onCitySelected(city)}>
                            {city.combinedName}
                    </button>
                )}
            </div>}
        </div>
    )
}

const citySearchRegex = new RegExp(/^[a-zA-Z ,]+$/); // for now, only a-z characters but will need to expand to include accents, etc.
const validateCitySearchQuery = (searchQuery: string) => searchQuery.length > 1 && citySearchRegex.test(searchQuery);

export default CitySearch
