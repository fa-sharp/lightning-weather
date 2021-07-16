import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CitySearch from '../components/Search/CitySearch'
import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay';
import { CityCombinedDataType } from '../data/cityDataUtil';
import styles from '../styles/Weather.module.scss'

interface Props {
    
}

function Weather({}: Props) {

    const [loadedCity, setLoadedCity] = useState<CityCombinedDataType | null>(null);

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
                {loadedCity && <WeatherDisplay city={loadedCity} units="imperial" />}
            </main>
        </Layout>
    )
}

export default Weather
