import React from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import useWeatherFetch from '../../data/useWeatherFetch'
import CurrentWeather from './CurrentWeather'
import styles from './WeatherDisplay.module.scss'

interface WeatherDisplayProps {
    city: City
    units?: WeatherUnits

    addButton?: boolean
    addCity?: (city: City) => void

    removeButton?: boolean
    removeCity?: (city: City) => void
}

const WeatherDisplay = ({ city, units=WeatherUnits.IMPERIAL, addButton=false, removeButton=false, addCity, removeCity }: WeatherDisplayProps) => {

    const [data, error] = useWeatherFetch(city.id, units);
    
    const cityTitle = `${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`;

    return (
        <section className={styles.weatherDisplay} aria-label={cityTitle}>
            
            <h2>{cityTitle}</h2>
            
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
                <button className={styles.removeButton} title="Remove" aria-label="Remove city"
                    onClick={() => removeCity ? removeCity(city) : null} >
                    X
                </button>}
        </section>
    )
}

export default WeatherDisplay
