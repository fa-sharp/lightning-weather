import React from 'react'
import styles from './WeatherDisplay.module.scss'
import HourlyTempGraph from '../Chart/HourlyTempGraph'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import { getCurrentLocalHour, getFormattedLocalDay, getFormattedLocalDayLong, getLocalDay } from '../../utils/DateTimeUtils'
import { FormattedHourlyData, getFormattedHourlyData } from '../../utils/ForecastDataUtils'
import { NUM_FORECAST_DAYS } from './Forecast'

interface Props {
    show: boolean;
    day: number;
    data: APIForecastData
    units: WeatherUnits
    onNavigate: (direction: "next" | "prev") => void;
}

const ForecastDayView = ({show, day, data, units, onNavigate}: Props) => {

    if (!show)
        return null;

    const { daily, hourly, timezone_offset } = data;
    const localDay = getLocalDay(daily[day].dt, timezone_offset);
    const localFormattedDay = getFormattedLocalDayLong(daily[day].dt, timezone_offset);

    if (day < 2) { // if the first two days, we'll display an hourly graph
        
        const hourlyData = getFormattedHourlyData(hourly, timezone_offset, units);
        
        let dataToDisplay: FormattedHourlyData | null;
        
        // if we're viewing today's data and the current time is on or after 6am, show the next 18 hours  
        if (day === 0 && getCurrentLocalHour(timezone_offset) >= 6) 
            dataToDisplay = hourlyData.slice(0, 18);
        
        else // otherwise, we show the forecast between 6am and 11pm
            dataToDisplay = hourlyData.filter(hourData => hourData.day === localDay && hourData.hour >= 6 && hourData.hour < 24);

        return (
            <div className={styles.dayView}>
                <div className={styles.dayNavigation}>
                    <button className={day !== 0 ? styles.controlButton : `${styles.controlButton} ${styles.hidden}`}
                        aria-label="Previous day" title="Previous day"
                        onClick={() => onNavigate('prev')}>
                        <span className="material-icons">navigate_before</span>
                    </button>

                    <h3>{localFormattedDay}</h3>

                    {day !== NUM_FORECAST_DAYS - 1 &&
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
            <div className={styles.dayView}>
                <h3>{localFormattedDay}</h3>
                
            </div>
        )
    }
}

export default ForecastDayView
