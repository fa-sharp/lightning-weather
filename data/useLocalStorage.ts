import { useEffect, useState } from "react";
import { ChangeUserOption, City, UserOptions, WeatherUnits } from "./DataTypes";

const CITIES_KEY = "savedCities";
export const MAX_SAVED_CITIES = 4;
const DEFAULT_CITIES = [
    {"id":5128581,"name":"New York City","state":"NY","country":"US","coord":{"lon":-74.005966,"lat":40.714272},"combinedName":"New York City, NY, US"},
    {"id":2968815,"name":"Paris","state":"","country":"FR","coord":{"lon":2.3486,"lat":48.853401},"combinedName":"Paris, FR"}
];

const OPTIONS_KEY = "userOptions";
const DEFAULT_OPTIONS: UserOptions = {
    units: WeatherUnits.IMPERIAL, withColor: false, detectLocation: true
};

const useLocalStorage = () => {

    const [savedCities, setSavedCities] = useState<City[]>([]);
    const [options, setOptions] = useState<UserOptions>();

    // Retrieve saved cities and options from local storage on first load. Set to default if no data is found
    useEffect(() => {
        const savedCitiesStorage = localStorage.getItem(CITIES_KEY);
        const optionsStorage = localStorage.getItem(OPTIONS_KEY);

        setSavedCities(savedCitiesStorage ? JSON.parse(savedCitiesStorage) : DEFAULT_CITIES);
        setOptions(optionsStorage ? JSON.parse(optionsStorage) : DEFAULT_OPTIONS);
    }, []);
    
    /**
     * Adds a new saved city, and stores it in local storage
     * @param newCity the city object to add
     */
    const addCity = (newCity: City) => {
        // Return if city already saved, or there are already max saved cities
        if (!savedCities || savedCities.length === MAX_SAVED_CITIES || savedCities.find(city => city.id === newCity.id))
            return;

        const newSavedCities = [...savedCities, newCity];
        
        setSavedCities(newSavedCities);
        localStorage.setItem(CITIES_KEY, JSON.stringify(newSavedCities));
    }

    /**
     * Removes a city from the list of saved cities, as well as from local storage.
     */
    const removeCity = (cityToRemove: City) => {
        if (!savedCities)
            return;

        const newSavedCities = savedCities.filter(city => city.id !== cityToRemove.id);

        setSavedCities(newSavedCities);
        localStorage.setItem(CITIES_KEY, JSON.stringify(newSavedCities));
    }

    /** Change and save one of the user options */
    const changeOption: ChangeUserOption = (option, newValue) => {
        if (!options)
            return;
        
        const newOptions = {...options, [option]: newValue};
        setOptions(newOptions);
        localStorage.setItem(OPTIONS_KEY, JSON.stringify(newOptions));
    }

    return { savedCities, addCity, removeCity, options, changeOption };
}

export default useLocalStorage;