import { useEffect, useState } from "react";
import useSWR from "swr";
import { City } from "./DataTypes";

const CITIES_KEY = "savedCities";
export const MAX_SAVED_CITIES = 4;
const DEFAULT_CITIES = [{"id":5128581,"name":"New York City","state":"NY","country":"US","coord":{"lon":-74.005966,"lat":40.714272},"combinedName":"New York City, NY, US"},{"id":2968815,"name":"Paris","state":"","country":"FR","coord":{"lon":2.3486,"lat":48.853401},"combinedName":"Paris, FR"}];

const USER_PREFS_KEY = "userPrefs";
const DEFAULT_USER_PREFS = {units: "imperial"};

const useLocalStorage = () => {

    const [savedCities, setSavedCities] = useState<City[] | null>(null);

    // Retrieve saved cities from local storage on first load
    useEffect(() => {
        const savedCitiesStorage = localStorage.getItem(CITIES_KEY);
        setSavedCities(savedCitiesStorage ? JSON.parse(savedCitiesStorage) : DEFAULT_CITIES);
    }, []);
    
    const addCity = (newCity: City) => {
        // Return if city already saved, or there are already max saved cities
        if (!savedCities || savedCities.length === MAX_SAVED_CITIES || savedCities.find(city => city.id === newCity.id))
            return;

        const newSavedCities = [...savedCities, newCity];
        
        setSavedCities(newSavedCities);
        localStorage.setItem(CITIES_KEY, JSON.stringify(newSavedCities));
    }

    const removeCity = (cityToRemove: City) => {
        if (!savedCities)
            return;

        const newSavedCities = savedCities.filter(city => city.id !== cityToRemove.id);

        setSavedCities(newSavedCities);
        localStorage.setItem(CITIES_KEY, JSON.stringify(newSavedCities));
    }

    return {savedCities, addCity, removeCity};
}

export default useLocalStorage;