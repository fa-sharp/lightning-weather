import React from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import Image from 'next/image'
import useForecastFetch from '../../data/useForecastFetch'
import styles from './WeatherDisplay.module.scss'

interface ForecastProps {
    data: ForecastData
    units: WeatherUnits
}

const Forecast = ({data, units}: ForecastProps) => {

    const { daily, timezone_offset } = data;

    return (
        <section className={styles.forecast} aria-label="Forecast">
            {daily.map((day, numDay) => {
                if (numDay >= NUM_FORECAST_DAYS)
                    return null;

                const { dt, temp: { min, max }, weather } = day;
                const { description, icon } = weather[0];

                return (
                    <article className={styles.day} key={numDay}>
                        <h3>{getLocalDay(dt,timezone_offset)}</h3>
                        <div className={styles.forecastIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/icons/${icon}.png`} alt="weather condition icon" />
                        </div>
                        {description} <br/>
                        {`${Math.round(max)} / ${Math.round(min)}${tempUnitsToString(units)}`}
                    </article>);
            })}
        </section>
    )
}

const NUM_FORECAST_DAYS = 4;

const tempUnitsToString = (units: WeatherUnits) => units === WeatherUnits.IMPERIAL ? "° F" : "° C";

const getLocalDay = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedDay = new Intl.DateTimeFormat('default', {weekday: 'short', timeZone: 'UTC'}).format(localTime);
    return formattedDay;
}

type ForecastData = {
    timezone_offset: number
    daily: ForecastDay[]
}

type ForecastDay = {
    dt: number
    temp: { min: number, max: number };
    weather: WeatherCondition[]
}

type WeatherCondition = {
    main: string
    description: string
    icon: string
}

export default Forecast
