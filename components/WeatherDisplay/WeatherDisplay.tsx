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
}

const WeatherDisplay = ({ city, units="imperial", addButton=true }: WeatherDisplayProps) => {

    const [data, error] = useWeatherFetch(city.id, units);

    return (
        !city ? null :
            <section className={styles.weatherDisplay}>
             
                <h2>{`${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`}</h2>
                
                {error ? "Failed to load"
                    : !data ? "Loading data..."
                    : (<CurrentWeather data={data} units={units} />)
                }


                {addButton && <button id={styles.addButton}>+ Add to Home</button>}
            </section>
    )
}

export default WeatherDisplay
