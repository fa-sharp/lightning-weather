import React from 'react'
import { WeatherUnits } from '../../data/DataTypes'
import Image from 'next/image'
import styles from './WeatherDisplay.module.scss'
import { LoadingSpinner } from '../Misc/LoadingSpinner';

interface ForecastProps {
    data: APIForecastData
    units: WeatherUnits
    fetchError?: boolean
}

const forecastClass = styles.forecast;

const Forecast = ({data, units, fetchError}: ForecastProps) => {

    if (fetchError)
        return <div className={forecastClass}>Failed to fetch forecast 😭</div>
    else if (!data)
        return <div className={forecastClass}>
            <div>Loading forecast... <LoadingSpinner /></div>
        </div>

    const { daily, timezone_offset } = data;

    return (
        <section className={styles.forecast} aria-label="Forecast">
            {daily.map((day, numDay) => {
                if (numDay >= NUM_FORECAST_DAYS)
                    return null;

                const { dt, temp: { min, max }, weather } = day;
                const { main, description, icon } = weather[0];

                return (
                    <article className={styles.day} key={numDay}>
                        <h3>{getLocalDay(dt,timezone_offset)}</h3>
                        <div className={styles.forecastIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/icons/${icon}.png`} alt="weather condition icon" />
                        </div>
                        {`${Math.round(max)} / ${Math.round(min)}${tempUnitsToString(units)}`}<br/>
                        {description} 
                    </article>);
            })}
        </section>
    )
}

const NUM_FORECAST_DAYS = 6;

const tempUnitsToString = (units: WeatherUnits) => units === WeatherUnits.IMPERIAL ? "° F" : "° C";

const getLocalDay = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedDay = new Intl.DateTimeFormat('default', {weekday: 'short', timeZone: 'UTC'}).format(localTime);
    return formattedDay;
}

type APIForecastData = {
    timezone_offset: number
    daily: APIForecastDay[]
}

type APIForecastDay = {
    dt: number
    temp: { min: number, max: number };
    weather: APIWeatherCondition[]
}

type APIWeatherCondition = {
    main: string
    description: string
    icon: string
}

export default Forecast
