import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react'
import useSWR from 'swr';
import { CityCombinedDataType } from '../../data/cityDataTypes'
import styles from './CitySearch.module.scss'

interface CitySearchProps {
    onCitySearch: (selectedCity: CityCombinedDataType | null) => void;
}

const CitySearch = ({ onCitySearch }: CitySearchProps) => {

    const { data: cityDataList, error: cityDataError } = useSWR<CityCombinedDataType[]>('/api/cities', { revalidateOnFocus: false });

    const [currentQuery, setCurrentQuery] = useState("");
    const [validQuery, setValidQuery] = useState(false);
    const [selectedCity, setSelectedCity] = useState<CityCombinedDataType | null>(null);

    const citySearchRef = useRef<HTMLInputElement>(null);

    const onCitySearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedCity(null);

        const citySearchQuery = event.target.value;
        setCurrentQuery(citySearchQuery);
        setValidQuery(validateCitySearchQuery(citySearchQuery));
    }

    const onCitySelected = (city: CityCombinedDataType) => {
        setSelectedCity(city);
        onCitySearch(city);
        if (citySearchRef.current)
            citySearchRef.current.value = city.combinedName;
    }


    return (
        <section className={styles.citySearch}>
            <label htmlFor={styles.citySearchInput}>Search cities: </label>
            <span className={styles.citySearchContainer}>
                <input ref={citySearchRef} name="citySearch" id={styles.citySearchInput}
                    autoComplete="off" type="search" onChange={onCitySearchChange} placeholder="City Name"/>
                {/* <button type="submit" onClick={() => onCitySearch(selectedCity)}>Search</button> */}
                
                {validQuery && !selectedCity && (
                    cityDataError ? <div>Failed to load cities!</div>
                        : !cityDataList ? <div>Loading cities...</div>
                        : <div className={styles.citySearchItemList}>
                            {searchCities(currentQuery, cityDataList)?.map(city =>
                                <button className={styles.citySearchItem} key={city.id}
                                    onClick={() => onCitySelected(city)}>
                                        {city.combinedName}
                                </button>
                            ) || "City not found!"}
                        </div>)}
            </span>
        </section>
    )
}

const citySearchRegex = new RegExp(/^[a-zA-Z ,]+$/); // for now, only a-z characters but will need to expand to include accents, etc.
const validateCitySearchQuery = (searchQuery: string) => searchQuery.length > 1 && citySearchRegex.test(searchQuery);

const searchCities = (citySearchQuery: string, cityDataList: CityCombinedDataType[]) => {
    const foundCities = cityDataList
        .filter(cityData => cityData.combinedName.toLowerCase().startsWith(citySearchQuery.toLowerCase()))
        .slice(0,9);
    return foundCities.length !== 0 ? foundCities : null;
}

export default CitySearch
