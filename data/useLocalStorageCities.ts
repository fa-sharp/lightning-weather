import { useEffect, useState } from "react";
import useSWR from "swr";
import { CityCombinedDataType } from "./cityDataTypes";

const LOCAL_STORAGE_NAME = "savedCities";
const MAX_SAVED_CITIES = 4;
const DEFAULT_CITIES = [{"id":5128581,"name":"New York City","state":"NY","country":"US","coord":{"lon":-74.005966,"lat":40.714272},"combinedName":"New York City, NY, US"},{"id":2968815,"name":"Paris","state":"","country":"FR","coord":{"lon":2.3486,"lat":48.853401},"combinedName":"Paris, FR"}];


const useLocalStorageCities = () => {

    const [savedCities, setSavedCities] = useState<CityCombinedDataType[] | null>(null);

    // Retrieve saved cities from local storage on first load
    useEffect(() => {
        const savedCitiesStorage = localStorage.getItem(LOCAL_STORAGE_NAME);
        setSavedCities(savedCitiesStorage ? JSON.parse(savedCitiesStorage) : DEFAULT_CITIES);
    }, []);

    // Save cities to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(savedCities));
        console.log("writing to local storage");
    }, [savedCities]);
    
    const addCity = (newCity: CityCombinedDataType) => {
        // Return if city already saved, or there are already max saved cities
        if (!savedCities || savedCities.length === MAX_SAVED_CITIES || savedCities.find(city => city.id === newCity.id))
            return;
        
        setSavedCities([...savedCities, newCity]);
    }

    const removeCity = (cityToRemove: CityCombinedDataType) => {
        if (!savedCities)
            return;

        const newSavedCities = savedCities.filter(city => city.id !== cityToRemove.id);
        setSavedCities(newSavedCities);
    }

    return {savedCities, addCity, removeCity};
}

export default useLocalStorageCities;