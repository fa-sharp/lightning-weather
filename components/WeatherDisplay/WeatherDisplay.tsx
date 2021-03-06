import React, { useState } from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import useDetectLocation from '../../data/useDetectLocation'
import useForecastFetch from '../../data/useForecastFetch'
import useWeatherFetch from '../../data/useWeatherFetch'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import styles from './WeatherDisplay.module.scss'

interface WeatherDisplayProps {
    city: City | "detect"
    units?: WeatherUnits
    withColor?: boolean

    addButton?: boolean
    addCity?: (city: City) => void

    removeButton?: boolean
    removeCity?: (city: City) => void
}

const WeatherDisplay = ({ city, units = WeatherUnits.IMPERIAL, withColor = false, addButton = false, removeButton = false, addCity, removeCity }: WeatherDisplayProps) => {

    const [showForecast, setShowForecast] = useState(false);
    const [shouldFetchForecast, setShouldFetchForecast] = useState(false); // forecast data won't be fetched by default, until expanded

    const { geoLocation } = useDetectLocation({ enabled: city === 'detect' });

    const [weatherData, weatherFetchError] = useWeatherFetch({
        cityIdOrCoord: city === "detect" ? geoLocation : city.id,
        units
    });
    const [forecastData, forecastFetchError] = useForecastFetch({
        coord: city === 'detect' ? geoLocation : city.coord,
        units,
        shouldFetch: shouldFetchForecast
    });

    const [isGrowing, setIsGrowing] = useState(false);

    const onExpand = () => {
        setShouldFetchForecast(true); // When user opens the expanded view for the first time, fetch the forecast data.

        if (!showForecast) {
            setIsGrowing(true);
            setTimeout(() => {
                setIsGrowing(false);
                setShowForecast(true);
            }, 600);
        } else
            setShowForecast(false);
    }

    const cityTitle = city === 'detect' ?
        "📍My Location" : `${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`;

    return (
        <section className={`${styles.weatherDisplay} ${withColor ? styles.withColor : ""} ${(showForecast || isGrowing) ? styles.expanded : ""}`}
            aria-label={"Weather in " + cityTitle}>

            <h2>{cityTitle}</h2>

            {/* Default view: show current weather */}
            {!showForecast &&
                <CurrentWeather data={weatherData} units={units} fetchError={weatherFetchError} fadingOut={isGrowing} />
            }

            {/* Expanded view: show forecast */}
            {showForecast && !isGrowing &&
                <Forecast data={forecastData} units={units} fetchError={forecastFetchError} />}

            {/* Controls (save city, remove city, show forecast) */}
            <div className={styles.controls}>
                <button className={`${styles.controlButton} ${styles.editButton}`}><span className="material-icons">edit</span></button>
                <button className={styles.controlButton} aria-label="Display/hide Forecast" title={showForecast ? "Hide Forecast" : "Show Forecast"}
                    onClick={onExpand}>
                    {showForecast ? <span className="material-icons">expand_less</span>
                        : <span className="material-icons">expand_more</span>}
                </button>
                {addButton && city !== 'detect' &&
                    <button className={styles.controlButton} title="Add to home" aria-label="Add to home"
                        onClick={() => addCity ? addCity(city) : null} >
                        <span className="material-icons">add</span>
                    </button>}
                {removeButton && city !== 'detect' &&
                    <button className={styles.controlButton} title="Remove" aria-label="Remove city"
                        onClick={() => removeCity ? removeCity(city) : null} >
                        <span className="material-icons">clear</span>
                    </button>}
                {!addButton && !removeButton && <button className={`${styles.controlButton} ${styles.editButton}`}></button>}
            </div>
        </section>
    )
}

export default WeatherDisplay
