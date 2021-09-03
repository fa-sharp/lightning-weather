import React from 'react'
import styles from './WeatherDisplay.module.scss'
import HourlyTempGraph from '../Chart/HourlyTempGraph'
import Image from 'next/image'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import { getCurrentLocalHour, getFormattedLocalDay, getFormattedLocalDayLong, getLocalDay } from '../../utils/DateTimeUtils'
import { FormattedDailyDataType, FormattedHourlyDataType, getFormattedDailyData, getFormattedHourlyData } from '../../utils/ForecastDataUtils'
import { NUM_FORECAST_DAYS } from './Forecast'

interface Props {
    numDay: number;
    dailyData: FormattedDailyDataType
    hourlyData: FormattedHourlyDataType
    data: APIForecastData
    units: WeatherUnits
    onNavigate: (direction: "next" | "prev") => void;
    onExitDayView: () => void;
}

const ForecastDayView = ({numDay, data, dailyData, hourlyData, units, onNavigate, onExitDayView}: Props) => {

    const { daily, hourly, timezone_offset } = data;

    const { day, formattedDayLong, icon, main, description, minTemp, maxTemp, humidity, rain, wind, clouds,
         morningTemp, afternoonTemp, eveningTemp, nightTemp, sunriseTime, sunsetTime } = dailyData[numDay];

    if (numDay < 2) { // if the first two days, we'll display an hourly graph

        let dataToDisplay: FormattedHourlyDataType | null;
        
        // if we're viewing today's data and the current time is on or after 6am, show the next 18 hours  
        if (numDay === 0 && getCurrentLocalHour(timezone_offset) >= 6) 
            dataToDisplay = hourlyData.slice(0, 18);
        
        else // otherwise, we show the forecast between 6am and 11pm
            dataToDisplay = hourlyData.filter(hourData => hourData.day === day && hourData.hour >= 6 && hourData.hour < 24);

        return (
            <div className={styles.dayView}>
                <div className={styles.dayViewNavigation}>
                    <button className={numDay !== 0 ? styles.controlButton : `${styles.controlButton} ${styles.hidden}`}
                        aria-label="Previous day" title="Previous day"
                        onClick={() => onNavigate('prev')}>
                        <span className="material-icons">navigate_before</span>
                    </button>

                    <h3>{formattedDayLong}</h3>

                    {numDay !== NUM_FORECAST_DAYS - 1 &&
                        <button className={styles.controlButton}
                            aria-label="Next day" title="Next day"
                            onClick={() => onNavigate('next')}>
                            <span className="material-icons">navigate_next</span>
                        </button>}
                </div>
                <div>Other data</div>
                <HourlyTempGraph dataToDisplay={dataToDisplay} units={units} />
            </div>
        );
    }
    else { // for later days, we'll display less specific data (morning, afternoon, etc.)
        return (
            <>
                <nav className={styles.dayViewNavigation} aria-label={`Current day: ${formattedDayLong}`}>
                    <button className={`${styles.controlButton} ${styles.backButton}`}
                        aria-label="Go back to daily forecast" title="Back to daily forecast"
                        onClick={onExitDayView}>
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
                <div className={styles.dayViewContent}>
                    <div>
                        <Image src={`/icons/${icon}.png`} alt={main} height={48} width={48} /><br />
                        <div>{description}</div>
                        <br />
                        {rain && <div>{`💦 Rain: ${rain}`}</div>}
                        <div>{`💨 Wind: ${wind}`}</div>
                        <div>{`☁️ Clouds: ${clouds}`}</div>
                    </div>
                    <aside>
                        <div>{`Morning: ${morningTemp}`}</div>
                        <div>{`Afternoon: ${afternoonTemp}`}</div>
                        <div>{`Evening: ${eveningTemp}`}</div>
                        <div>{`Night: ${nightTemp}`}</div>
                        <br />
                        <div>{`☀️ Sunrise: ${sunriseTime}`}</div>
                        <div>{`🌙 Sunset: ${sunsetTime}`}</div>
                    </aside>
                </div>
            </>
        )
    }
}

export default ForecastDayView
