import React from 'react'
import styles from './WeatherDisplay.module.scss'
import { WeatherUnits } from '../../data/useWeatherFetch'

interface CurrentWeatherProps {
    data: any
    units: WeatherUnits
}

const CurrentWeather = ({data, units}: CurrentWeatherProps) => {

    const {main: {temp, feels_like, humidity}, weather, clouds} = data;

    return (
        <div className={styles.currentWeather}>
            <div>
                <div className={styles.weatherIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/${weather[0].icon}.png`} alt="weather condition icon"></img>
                </div>
                <h3>{`${Math.round(temp)}${(units === "imperial") ? " °F" : " °C"}`}</h3>
                <h3>{`${weather[0].main}`}</h3>
                {`"${weather[0].description}"`}
            </div>
            <div>
                {`Feels like: ${Math.round(feels_like)}${(units === "imperial") ? " °F" : " °C"}`}<br/>
                {`Humidity: ${humidity}%`}<br/>
                {`Clouds: ${clouds.all}%`}
            </div>
        </div>
    )
}

export default CurrentWeather
