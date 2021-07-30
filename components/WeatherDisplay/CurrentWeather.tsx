import React from 'react'
import { WeatherUnits } from '../../data/DataTypes';
import { LoadingSpinner } from '../Misc/LoadingSpinner';
import styles from './WeatherDisplay.module.scss';

interface CurrentWeatherProps {
    data: any
    units: WeatherUnits
    fetchError?: boolean
    fadingOut?: boolean
}

const currentWeatherClass = styles.currentWeather;

const CurrentWeather = ({data, units, fetchError, fadingOut}: CurrentWeatherProps) => {

    if (fetchError)
        return <div className={currentWeatherClass}>Failed to fetch weather 😭</div>
    else if (!data)
        return <div className={currentWeatherClass}>
            <div>Loading current weather... <LoadingSpinner /></div>
        </div>

    const {main: {temp, feels_like, humidity}, wind: { speed }, weather, clouds, timezone} = data;
    const tempUnits = tempUnitsToString(units);

    return (
        <div className={`${currentWeatherClass} ${fadingOut ? styles.fadingOut : ""}`}>
            <div>
                <div className={styles.weatherIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/${weather[0].icon}.png`} alt="weather condition icon"></img>
                </div>
                <h3>{`${Math.round(temp)}${tempUnits}`}</h3>
                <h3>{`${weather[0].main}`}</h3>
                {`${weather[0].description}`}
            </div>
            <aside className={styles.weatherDetails}>
                {`${getLocalTime(timezone)}`}<br/><br/>
                {`Feels like: ${Math.round(feels_like)}${tempUnits}`}<br/>
                {`Humidity: ${humidity}%`}<br/>
                {`Clouds: ${clouds.all}%`}<br/>
                {`Wind: ${formattedWindSpeed(speed, units)}`}
            </aside>
        </div>
    )
}

const tempUnitsToString = (units: WeatherUnits) => units === WeatherUnits.IMPERIAL ? "° F" : "° C";

const formattedWindSpeed = (speed: number, units: WeatherUnits) => {
    if (units === WeatherUnits.IMPERIAL)
        return `${Math.round(speed)} mph`;
    else
        return `${Math.round(speed*3.6)} kph`;
}

const getLocalTime = (timeOffset: number) => {
    const localTime = new Date(Date.now() + (timeOffset*1000));
    const formattedTime = new Intl.DateTimeFormat('default', {weekday: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'}).format(localTime);
    return formattedTime;
}

export default CurrentWeather
