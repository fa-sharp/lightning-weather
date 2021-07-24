import React from 'react'
import { WeatherUnits } from '../../data/DataTypes';
import styles from './WeatherDisplay.module.scss';

interface CurrentWeatherProps {
    data: any
    units: WeatherUnits
}

const CurrentWeather = ({data, units}: CurrentWeatherProps) => {

    const {main: {temp, feels_like, humidity}, weather, clouds, timezone} = data;

    return (
        <div className={styles.currentWeather}>
            <div>
                <div className={styles.weatherIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/${weather[0].icon}.png`} alt="weather condition icon"></img>
                </div>
                <h3>{`${Math.round(temp)}${tempUnitsToString(units)}`}</h3>
                <h3>{`${weather[0].main}`}</h3>
                {`${weather[0].description}`}
            </div>
            <aside className={styles.weatherDetails}>
                {`${getLocalTime(timezone)}`}<br/><br/>
                {`Feels like: ${Math.round(feels_like)}${tempUnitsToString(units)}`}<br/>
                {`Humidity: ${humidity}%`}<br/>
                {`Clouds: ${clouds.all}%`}
            </aside>
        </div>
    )
}

const tempUnitsToString = (units: WeatherUnits) => units === WeatherUnits.IMPERIAL ? "° F" : "° C";

const getLocalTime = (timeOffset: number) => {
    const localTime = new Date(Date.now() + (timeOffset*1000));
    const formattedTime = new Intl.DateTimeFormat('default', {weekday: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'}).format(localTime);
    return formattedTime;
}

export default CurrentWeather
