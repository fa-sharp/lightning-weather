import useSWRImmutable from 'swr/immutable';
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

const useForecastFetch = ({ coord, units, shouldFetch }: {
    coord: { lat: number, lon: number } | null, 
    units: WeatherUnits, 
    shouldFetch: boolean
}) => {
    
    const url = coord ? `${BASE_URL}?lat=${coord.lat}&lon=${coord.lon}&units=${units}` : null;
    
    const { data, error } = useSWRImmutable(shouldFetch ? url : null, fetcher);

    return [data, error];
}

export default useForecastFetch