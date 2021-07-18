import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataUtil'
import useWeatherFetch, { WeatherUnits } from '../../data/useWeatherFetch'
import CurrentWeather from './CurrentWeather'
import styles from './WeatherDisplay.module.scss'

interface WeatherDisplayProps {
    city: CityCombinedDataType
    units?: WeatherUnits
}

const WeatherDisplay = ({ city, units="imperial" }: WeatherDisplayProps) => {

    const [data, error] = useWeatherFetch(city.id, units);

    return (
        !city ? null :
            <section className={styles.weatherDisplay}>
             
                <h2>{`${city.name}${(city.state !== "") ? (', ' + city.state) : ""}`}</h2>
                
                {error ? "Failed to load"
                    : !data ? "Loading data..."
                    : (<CurrentWeather data={data} units={units} />)
                }
            </section>
    )
}

export default WeatherDisplay
