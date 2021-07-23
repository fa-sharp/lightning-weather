import React, { ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash';
import { City } from '../../data/DataTypes'
import styles from './CitySearch.module.scss'
import useCitiesFetch from '../../data/useCitiesFetch';

interface CitySearchProps {
    onCityLoad: (selectedCity: City | null) => void;
}

const CitySearch = ({ onCityLoad }: CitySearchProps) => {

    const [currentQuery, setCurrentQuery] = useState("");
    const [validQuery, setValidQuery] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const {foundCities, fetchingCities, error: fetchCitiesError} = useCitiesFetch(currentQuery);

    const [displayedCities, setDisplayedCities] = useState<City[] | null>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const citySearchRef = useRef<HTMLInputElement>(null);


    const immediateSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCity(null);
        setWaiting(true);
        setValidQuery(validateCitySearchQuery(event.target.value));
    }

    const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const citySearchQuery = event.target.value;
        
        setCurrentQuery(validateCitySearchQuery(citySearchQuery) ? citySearchQuery : "");
        setWaiting(false);
    }
    
    const debouncedSearchHandler = useMemo(() => debounce(onSearch, 350), []);

    const onCitySelected = (city: City) => {
        setSelectedCity(city);
        onCityLoad(city);
        if (citySearchRef.current)
            citySearchRef.current.value = city.combinedName;
    }

    useEffect(() => {
        if (foundCities)
            setDisplayedCities(foundCities);
        else if (fetchCitiesError)
            setDisplayedCities(null);
    }, [fetchCitiesError, foundCities])

    return (
        <section className={styles.citySearch}>
            <label className={styles.citySearchLabel} htmlFor={styles.citySearchInput}>Search cities: </label>
            <span className={styles.citySearchContainer}>
                <input ref={citySearchRef} id={styles.citySearchInput}
                    className={(waiting || fetchingCities) ? styles.loading : ""}
                    name="citySearch" placeholder="City Name"
                    autoComplete="off" type="search" 
                    onChange={(e) => {immediateSearchHandler(e); debouncedSearchHandler(e);}} />
                <i className={styles.loadingIcon}></i>
                
                {!selectedCity && validQuery && displayedCities &&
                    <div className={styles.citySearchItemList}>
                        {displayedCities.length === 0 ? "City not found!"
                            : displayedCities.map(city =>
                                <button className={styles.citySearchItem} key={city.id}
                                    onClick={() => onCitySelected(city)}>
                                        {city.combinedName}
                                </button>
                            )}
                    </div>}
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
