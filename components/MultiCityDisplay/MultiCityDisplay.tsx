import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataTypes'
import { WeatherUnits } from '../../data/weatherDataTypes'
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
        </div>
    )
}

export default MultiCityDisplay
