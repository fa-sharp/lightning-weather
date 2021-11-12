import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash';
import { City } from '../../data/DataTypes'
import styles from './CitySearch.module.scss'
import useCitiesFetch from '../../data/useCitiesFetch';
import { LoadingSpinner } from '../Misc/LoadingSpinner';

interface CitySearchProps {
    onCityLoad: (selectedCity: City | null) => void;
}

const CitySearch = ({ onCityLoad }: CitySearchProps) => {

    /** Query that's sent to the server */
    const [currentQuery, setCurrentQuery] = useState("");
    /** The fetching function. If the currentQuery is an empty string, nothing will be fetched. */
    const { foundCities, fetchingCities, error: fetchCitiesError } = useCitiesFetch(currentQuery);

    /** Whether the current user input is valid */
    const [validQuery, setValidQuery] = useState(false);
    /** Whether the input is currently waiting (debouncing) before sending the query to the server */
    const [waiting, setWaiting] = useState(false);

    /** The city results list that is displayed to the user */
    const [displayedCities, setDisplayedCities] = useState<City[] | null>(null);
    /** The currently selected city */
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    /** The city search input element */
    const citySearchRef = useRef<HTMLInputElement>(null);

    /** Runs immediately every time the user changes the input. */
    const immediateSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCity(null);
        setWaiting(true);
        setValidQuery(validateCitySearchQuery(event.target.value));
    }

    /** If the user's input is valid, this will update currentQuery so that it's sent to the server. Otherwise, this sets currentQuery to an empty string so nothing is sent to the server. */
    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const citySearchQuery = event.target.value;
        setCurrentQuery(validateCitySearchQuery(citySearchQuery) ? citySearchQuery : "");
        setWaiting(false);
    }

    /** The debounced version of onSearch. Debouncing limits calls to the server */
    const debouncedSearchHandler = useMemo(() => debounce(onSearch, 250), []);

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
                    name="citySearch" placeholder="City Name" autoFocus
                    autoComplete="off" type="search" 
                    onChange={e => {immediateSearchHandler(e); debouncedSearchHandler(e);}} />
                
                {(waiting || fetchingCities) && 
                    <div className={styles.loadingIcon}>
                        <LoadingSpinner />
                    </div>}
                
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

const validateCitySearchQuery = (searchQuery: string) => searchQuery.length > 1;

export default CitySearch