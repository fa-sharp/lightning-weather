import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataTypes'
import useWeatherFetch from '../../data/useWeatherFetch'
import { WeatherUnits } from '../../data/weatherDataTypes'
import CurrentWeather from './CurrentWeather'
import styles from './WeatherDisplay.module.scss'

interface WeatherDisplayProps {
    city: CityCombinedDataType
    units?: WeatherUnits

    addButton?: boolean
    addCity?: (city: CityCombinedDataType) => void

    removeButton?: boolean
    removeCity?: (city: CityCombinedDataType) => void
}

const WeatherDisplay = ({ city, units="imperial", addButton=false, removeButton=false, addCity, removeCity }: WeatherDisplayProps) => {

    const [data, error] = useWeatherFetch(city.id, units);

    return (
        <section className={styles.weatherDisplay}>
            
            <h2>{`${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`}</h2>
            
            {error ? "Failed to load"
                : !data ? "Loading data..."
                : (<CurrentWeather data={data} units={units} />)
            }

            {addButton && 
                <button className={styles.addButton}
                    onClick={() => addCity ? addCity(city) : null} >
                        + Add to Home
                </button>}
            
            {removeButton &&
                <button className={styles.removeButton}
                onClick={() => removeCity ? removeCity(city) : null} >
                    X
            </button>}
        </section>
    )
}

export default WeatherDisplay
