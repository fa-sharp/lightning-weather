import React from 'react'
import Layout from '../components/Layout/Layout'
import CitySearch from '../components/Search/CitySearch'
import styles from '../styles/Weather.module.scss'

interface Props {
    
}

function Weather({}: Props) {

    const onCitySearchSubmit = (event: any) => console.log(event);
    
    return (
        <Layout>
            <div className={styles.weather}>
                <CitySearch onSubmit={onCitySearchSubmit}/>
            </div>
        </Layout>
    )
}

export default Weather
