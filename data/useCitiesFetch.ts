import { useState, useEffect } from "react";
import { City } from "./DataTypes";

const BASE_URL = '/api/testcities';
const generateURL = (searchQuery: string) => `${BASE_URL}?search=${searchQuery}`;

const fetchCities = async (searchQuery: string) => {
    
    if (searchQuery === "")
        return null;

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

/** foundCities will be null if loading, or if there's an error. It will be an empty erray if no cities are found */
const useCitiesFetch = (searchQuery: string): [City[] | null, boolean] => {
    
    const [foundCities, setFoundCities] = useState<City[] | null>(null);
    const [fetchingCities, setFetchingCities] = useState(true);

    useEffect(() => {
        fetchCities(searchQuery).then(foundCities => setFoundCities(foundCities));
        setFetchingCities(false);
    }, [searchQuery]);

    return [foundCities, fetchingCities];
}

export default useCitiesFetch;