import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CitySearch from '../components/Search/CitySearch'
import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay';
import { City } from '../data/DataTypes';
import useLocalStorage from '../data/useLocalStorage';
import styles from '../styles/Search.module.scss'

const Search = () => {

    const { options, addCity } = useLocalStorage();
    const [loadedCity, setLoadedCity] = useState<City | null>(null);
    const router = useRouter();

    const onCityLoad = (selectedCity: City | null) => {
        if (!selectedCity) // For now, nothing happens if user hasn't selected a city from the dropdown
            return;
        else
            setLoadedCity(selectedCity);
    };
    
    return (
        <Layout>
            <main className={styles.weather}>
                <CitySearch onCityLoad={onCityLoad}/>
                {loadedCity && options && 
                    <WeatherDisplay city={loadedCity} units={options.units} withColor={options.withColor}
                        addButton={true} 
                        addCity={(city) => {
                            addCity(city);
                            router.push('/'); 
                        }
                    } />
                }
            </main>
        </Layout>
    )
}

export default Search
