import { useState, useEffect } from "react";
import { City } from "./DataTypes";

const BASE_URL = '/api/testcities';
const generateURL = (searchQuery: string) => `${BASE_URL}?search=${encodeURIComponent(searchQuery)}`;

const fetchCities = async (searchQuery: string) => {

    try {
        const response = await fetch(generateURL(searchQuery));
        if (response.ok) {
            const data: City[] = await response.json();
            return data;
        } else {
            const message = await response.text();
            console.error("Error fetching cities from server. Server says: " + message);
            return null;
        }
    }
    catch (err) {
        console.error("Error fetching cities!");
        console.log(err);
        return null;
    }
}

/**
 *  @param searchQuery the query to search the city list. If it's an empty string, nothing will be fetched from the server
 *  
 *  @returns An object containing:
 * 
 *  foundCities - the cities that were found. It will be null if loading, if the searchQuery is empty, if there's an error. It will be an empty array if no cities are found.
 *  
 *  fetchingCities - whether it's waiting for a response from the server
 *  
 *  error - whether there was an error from the server
 */
const useCitiesFetch = (searchQuery: string) => {
    
    const [foundCities, setFoundCities] = useState<City[] | null>(null);
    const [fetchingCities, setFetchingCities] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (searchQuery === "") {
            setFetchingCities(false);
            return;
        }
        
        setFetchingCities(true);
        fetchCities(searchQuery).then(foundCities => {
            if (foundCities)
                setFoundCities(foundCities)
            else
                setError(true);

            setFetchingCities(false);
        });
    }, [searchQuery]);

    return {foundCities, fetchingCities, error};
}

export default useCitiesFetch;