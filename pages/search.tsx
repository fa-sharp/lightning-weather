import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CitySearch from '../components/Search/CitySearch'
import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay';
import { CityCombinedDataType } from '../data/cityDataTypes';
import useLocalStorageCities from '../data/useLocalStorageCities';
import styles from '../styles/Search.module.scss'

const Search = () => {

    const { addCity } = useLocalStorageCities();
    const [loadedCity, setLoadedCity] = useState<CityCombinedDataType | null>(null);
    const router = useRouter();

    const onCitySearch = (selectedCity: CityCombinedDataType | null) => {
        if (!selectedCity) // For now, nothing happens if user hasn't selected a city from the dropdown
            return;
        else
            setLoadedCity(selectedCity);
    };
    
    return (
        <Layout>
            <main className={styles.weather}>
                <CitySearch onCitySearch={onCitySearch}/>
                {loadedCity && 
                    <WeatherDisplay city={loadedCity} units="imperial" addButton={true} 
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
