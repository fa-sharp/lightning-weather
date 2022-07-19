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

const useWeatherFetch = ({ cityIdOrCoord, units }: {
    cityIdOrCoord: number | { lat: number, lon: number } | null,
    units: WeatherUnits
}) => {

    const url = typeof cityIdOrCoord === 'number' ?
        `${BASE_URL}?cityId=${cityIdOrCoord}&units=${units}`
        : cityIdOrCoord ? `${BASE_URL}?lat=${cityIdOrCoord.lat}&lon=${cityIdOrCoord.lon}&units=${units}`
            : null;

    const { data, error } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        refreshInterval: 1000 * 60 * 4, // refresh interval of four minutes
    });

    return [data, error];
}

export default useWeatherFetch;