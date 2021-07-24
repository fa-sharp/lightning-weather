import React from 'react'
import { City, WeatherUnits } from '../../data/DataTypes'
import styles from './WeatherDisplay.module.scss'

interface ForecastProps {
    city: City
    units: WeatherUnits
}

const Forecast = ({city, units}: ForecastProps) => {
    return (
        <section className={styles.forecast} aria-label="Forecast">
            <div className={styles.day}>Mon</div>
            <div className={styles.day}>Tue</div>
            <div className={styles.day}>Wed</div>
            <div className={styles.day}>Thu</div>
            <div className={styles.day}>Fri</div>
        </section>
    )
}

const getLocalDay = (time: number, timeOffset: number) => {
    const localTime = new Date(time + (timeOffset*1000));
    const formattedDay = new Intl.DateTimeFormat('default', {weekday: 'short', timeZone: 'UTC'}).format(localTime);
    return formattedDay;
}

export default Forecast
