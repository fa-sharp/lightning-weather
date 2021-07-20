import Link from 'next/link'
import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataTypes'
import { MAX_SAVED_CITIES } from '../../data/useLocalStorage'
import { WeatherUnits } from '../../data/userPrefDataTypes'
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay'
import styles from './MultiCityDisplay.module.scss'

interface MultiCityProps {
    cities: CityCombinedDataType[]
    units: WeatherUnits
    removeCity: (city: CityCombinedDataType) => void
}

const MultiCityDisplay = ({cities, units, removeCity}: MultiCityProps) => {
    return (
        <div className={styles.grid}>
            {cities.map(city => 
                <WeatherDisplay city={city} key={city.id} units={units} 
                    removeButton={true} removeCity={removeCity} />)}
            {(cities.length === 0) &&
                <Link href="/search" passHref>
                    <button className={styles.noCitiesButton}><a>+</a></button>
                </Link>}
        </div>
    )
}

export default MultiCityDisplay
