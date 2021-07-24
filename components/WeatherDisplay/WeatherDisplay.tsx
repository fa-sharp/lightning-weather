import React, { useState } from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import useForecastFetch from '../../data/useForecastFetch'
import useWeatherFetch from '../../data/useWeatherFetch'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import styles from './WeatherDisplay.module.scss'

interface WeatherDisplayProps {
    city: City
    units?: WeatherUnits
    withColor?: boolean

    addButton?: boolean
    addCity?: (city: City) => void

    removeButton?: boolean
    removeCity?: (city: City) => void
}

const WeatherDisplay = ({ city, units=WeatherUnits.IMPERIAL, withColor=false, addButton=false, removeButton=false, addCity, removeCity }: WeatherDisplayProps) => {

    const [expanded, setExpanded] = useState(false);
    const [shouldFetchForecast, setShouldFetchForecast] = useState(false); // forecast data won't be fetched by default, until expanded

    const [weatherData, weatherFetchError] = useWeatherFetch(city.id, units);
    const [forecastData, forecastFetchError] = useForecastFetch(city.coord.lat, city.coord.lon, units, shouldFetchForecast);
    
    const onExpand = () => {
        setExpanded(prev => !prev);
        setShouldFetchForecast(true); // When user opens the expanded view for the first time, fetch the forecast data.
    }

    const cityTitle = `${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`;

    return (
        <section className={`${styles.weatherDisplay} ${withColor ? styles.withColor : ""} ${expanded ? styles.expanded : ""}`}
            aria-label={"Weather in " + cityTitle}>
            
            <h2>{cityTitle}</h2>
            
            {weatherFetchError ? "Failed to fetch weather"
                : !weatherData ? "Loading data..."
                : (<CurrentWeather data={weatherData} units={units} />)
            }

            {expanded &&
                (forecastFetchError ? "Failed to fetch forecast"
                    : !forecastData ? "Loading forecast..."
                    : <Forecast data={forecastData} units={units} />)}

            <button className={styles.expandButton}
                onClick={onExpand}>Expand</button>

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
