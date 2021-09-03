import React from 'react'
import { WeatherUnits } from '../../data/DataTypes';
import { getFormattedCurrentLocalTime } from '../../utils/DateTimeUtils';
import { formatPercentage, formatTemp, formatWindSpeed, tempUnitsToString } from '../../utils/UnitUtils';
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

    const {main: {temp, feels_like, humidity}, wind, weather, clouds, timezone} = data;
    const tempUnits = tempUnitsToString(units);

    return (
        <div className={`${currentWeatherClass} ${fadingOut ? styles.fadingOut : ""}`}>
            <div>
                <div className={styles.weatherIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/icons/${weather[0].icon}.png`} alt={weather[0].main}></img>
                </div>
                <h3>{formatTemp(temp, units)}</h3>
                <h3>{weather[0].main}</h3>
                {`${weather[0].description}`}
            </div>
            <aside className={styles.weatherDetails}>
                {`${getFormattedCurrentLocalTime(timezone)}`}<br/><br/>
                {`Feels like: ${formatTemp(feels_like, units)}`}<br/>
                {`Humidity: ${formatPercentage(humidity)}`}<br/>
                {`Clouds: ${formatPercentage(clouds.all)}`}<br/>
                {`Wind: ${formatWindSpeed(wind.speed, units)}`}
            </aside>
        </div>
    )
}


export default CurrentWeather
