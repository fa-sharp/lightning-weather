import React, { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash';
import useSWR from 'swr';
import { City } from '../../data/DataTypes'
import styles from './CitySearch.module.scss'

interface CitySearchProps {
    onCityLoad: (selectedCity: City | null) => void;
}

const CitySearch = ({ onCityLoad: onCitySearch }: CitySearchProps) => {

    const { data: cityDataList, error: cityDataError } = useSWR<City[]>('/api/cities', { revalidateOnFocus: false });

    const [currentQuery, setCurrentQuery] = useState("");
    const [validQuery, setValidQuery] = useState(false);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const citySearchRef = useRef<HTMLInputElement>(null);

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedCity(null);

        const citySearchQuery = event.target.value;
        setCurrentQuery(citySearchQuery);
        setValidQuery(validateCitySearchQuery(citySearchQuery));
    }

    const debouncedOnSearchChange = useMemo(() => debounce(onSearchChange, 350), []);

    const onCitySelected = (city: City) => {
        setSelectedCity(city);
        onCitySearch(city);
        if (citySearchRef.current)
            citySearchRef.current.value = city.combinedName;
    }

    useEffect(() => {
        console.log(currentQuery);
    }, [currentQuery])

    return (
        <section className={styles.citySearch}>
            <label className={styles.citySearchLabel} htmlFor={styles.citySearchInput}>Search cities: </label>
            <span className={styles.citySearchContainer}>
                <input ref={citySearchRef} id={styles.citySearchInput} name="citySearch" placeholder="City Name"
                    autoComplete="off" type="search" onChange={debouncedOnSearchChange} />
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
const validateCitySearchQuery = (searchQuery: string) => searchQuery.length > 1;

const searchCities = (citySearchQuery: string, cityDataList: City[]) => {
    const foundCities = cityDataList
        .filter(cityData => normalizeString(cityData.combinedName).startsWith(normalizeString(citySearchQuery)))
        .slice(0,9);
    return foundCities.length !== 0 ? foundCities : null;
}

const normalizeString = (str: string) => str.toLowerCase();

export default CitySearch
