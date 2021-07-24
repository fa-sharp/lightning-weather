import useSWR from 'swr';
import { WeatherUnits } from './DataTypes';

const BASE_URL = "/api/forecast";

const fetcher = (url: string) => fetch(url).then(res => {

    if (!res.ok) {
        res.json().then(errorData => {
            console.error("Error fetching forecast data from API. Status: ", res.statusText, errorData);
        });
        throw new Error("Error fetching forecast data");
    }

    return res.json();
});

const useForecastFetch = (lat: number, lon: number, units: WeatherUnits, shouldFetch: boolean) => {
    
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=${units}`;
    const { data, error } = useSWR(shouldFetch ? url : null, fetcher, {revalidateOnFocus: false, shouldRetryOnError: false}); // limited free API requests, so disabling revalidation

    return [data, error];
}

export default useForecastFetch