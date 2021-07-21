import useSWR from 'swr';
import { WeatherUnits } from './DataTypes';

const BASE_URL = "/api/weather";

const fetcher = (url: string) => fetch(url).then(res => {

    if (!res.ok) {
        res.json().then(errorData => {
            console.error("Error fetching weather data from API. Status: ", res.statusText, errorData);
        });
        throw new Error("Error fetching weather data");
    }

    return res.json();
});

const useWeatherFetch = (cityId: number, units: WeatherUnits) => {

    const url = `${BASE_URL}?cityId=${cityId}&units=${units}`
    const { data, error } = useSWR(url, fetcher, {revalidateOnFocus: false, shouldRetryOnError: false}); // limited free API requests, so disabling revalidation

    return [data, error];
}

export default useWeatherFetch;