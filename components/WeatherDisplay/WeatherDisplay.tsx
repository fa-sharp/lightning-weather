import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataUtil'
import useWeatherFetch, { WeatherUnits } from '../../data/useWeatherFetch'
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
                <h2>{city.name}{city.state !== "" && `, ${city.state}`}</h2>
                Country: {city.country}
                <br />
                {error ? "Failed to load"
                        : !data ? "Loading data..."
                        : <div>
                            Temp: {parseInt(data.main.temp)} {units==="imperial" ? "°F" : "°C" }<br />
                            Condition: {data.weather[0].main}<br />
                            Description: {data.weather[0].description}
                        </div>
                        }
            </section>
    )
}

export default WeatherDisplay
