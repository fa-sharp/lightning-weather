import Link from 'next/link'
import React from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay'
import styles from './MultiCityDisplay.module.scss'

interface MultiCityProps {
    cities: City[]
    units: WeatherUnits
    removeCity: (city: City) => void
}

const MultiCityDisplay = ({cities, units, removeCity}: MultiCityProps) => {
    return (
        <div className={styles.grid}>
            {cities.map(city => 
                <WeatherDisplay city={city} key={city.id} units={units} 
                    removeButton={true} removeCity={removeCity} />)}

            {/* If no cities are showing, display an Add button */}
            {(cities.length === 0) &&
                <Link href="/search" passHref>
                    <button className={styles.noCitiesButton}><a>Add City</a></button>
                </Link>}
        </div>
    )
}

export default MultiCityDisplay
