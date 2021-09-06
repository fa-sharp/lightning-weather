import React, { useState } from 'react'
import styles from './WeatherDisplay.module.scss'
import Image from 'next/image'
import { WeatherUnits } from '../../data/DataTypes'
import { FormattedDailyDataType, FormattedHourlyDataType } from '../../utils/ForecastDataUtils'
import HourlyTempGraph from '../Chart/HourlyTempGraph'

interface Props {
    numDay: number;
    dailyData: FormattedDailyDataType
    hourlyData: FormattedHourlyDataType
    units: WeatherUnits
    onNavigate: (direction: "next" | "prev") => void;
    onExitDayView: () => void;
}

const ForecastDayView = ({numDay, dailyData, hourlyData, units, onNavigate, onExitDayView}: Props) => {

    const { day, formattedDayLong, icon, main, description, minTemp, maxTempNoUnits, humidity, rain, snow, wind, clouds,
        morningTemp, afternoonTemp, eveningTemp, nightTemp, sunriseTime, sunsetTime } = dailyData[numDay];

    const [showHourlyGraph, setShowHourlyGraph] = useState(false);
    const hourlyGraphData = getHourlyDataToDisplay(numDay, day, hourlyData);
    
    return (
        <>
            <nav className={styles.dayViewNavigation} aria-label={`Current day: ${formattedDayLong}`}>
                <button className={`${styles.controlButton} ${styles.backButton}`}
                    aria-label={showHourlyGraph ? "Back to day view" : "Back to daily forecast"} 
                    title={showHourlyGraph ? "Back to day view" : "Back to daily forecast"}
                    onClick={() => showHourlyGraph ? setShowHourlyGraph(false) : onExitDayView()}>
                    <span className="material-icons">keyboard_backspace</span>
                </button>

                <button className={numDay !== 0 ? styles.controlButton : `${styles.controlButton} ${styles.hidden}`}
                    aria-label="Previous day" title="Previous day"
                    onClick={() => onNavigate('prev')}>
                    <span className="material-icons">navigate_before</span>
                </button>

                <h3>{formattedDayLong}</h3>

                <button className={numDay !== dailyData.length - 1 ? styles.controlButton : `${styles.controlButton} ${styles.hidden}`}
                    aria-label="Next day" title="Next day"
                    onClick={() => onNavigate('next')}>
                    <span className="material-icons">navigate_next</span>
                </button>
            </nav>
            {!showHourlyGraph ?
                <div className={styles.dayViewContent}>
                    <div>
                        <Image src={`/icons/${icon}.png`} alt={main} height={56} width={56} /><br />
                        <div>{description}</div>
                        <div>{`🌡 Hi ${maxTempNoUnits} / Lo ${minTemp}`}</div>
                        <br />
                        {rain && <div>{`💦 Rain: ${rain}`}</div>}
                        {snow && <div>{`❄️ Snow: ${snow}`}</div>}
                        <div>{`💨 Wind: ${wind}`}</div>
                        <div>{`☁️ Clouds: ${clouds}`}</div>
                        <div>{`💧 Humidity: ${humidity}`}</div>
                    </div>
                    <aside>
                        {hourlyGraphData &&
                            <button className={styles.hourlyButton} title="Show hourly forecast"
                                onClick={() => setShowHourlyGraph(true)}>
                                ⌛️ Hourly</button>}
                        <div>{`Morning: ${morningTemp}`}</div>
                        <div>{`Afternoon: ${afternoonTemp}`}</div>
                        <div>{`Evening: ${eveningTemp}`}</div>
                        <div>{`Night: ${nightTemp}`}</div>
                        <br />
                        <div>{`☀️ Sunrise: ${sunriseTime}`}</div>
                        <div>{`🌙 Sunset: ${sunsetTime}`}</div>
                    </aside>
                </div>
                : hourlyGraphData ? 
                    <HourlyTempGraph hourlyData={hourlyGraphData} units={units} />
                    : setShowHourlyGraph(false)}
        </>
    )
}

const getHourlyDataToDisplay = (numDay: number, day: number, hourlyData: FormattedHourlyDataType) => {
    // no hourly data past two days (API limitation)
    if (numDay > 2)
        return null;

    let dataToDisplay: FormattedHourlyDataType;

    // if we're viewing today's data and the current hour is on or after 6am, show the next 18 hours  
    if (numDay === 0 && hourlyData[0].hour >= 6) 
        dataToDisplay = hourlyData.slice(0, 18);

    else // otherwise, we show the forecast between 6am and 11pm
        dataToDisplay = hourlyData.filter(hourData => hourData.day === day && hourData.hour >= 6 && hourData.hour < 24);

    // return null if there's less than 6 hours to show
    return (dataToDisplay.length >= 6) ? dataToDisplay : null;
}

export default ForecastDayView