import React from 'react'
import styles from './WeatherDisplay.module.scss'
import HourlyTempGraph from '../Chart/HourlyTempGraph'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import { getCurrentLocalHour, getFormattedLocalDay, getFormattedLocalDayLong, getLocalDay } from '../../utils/DateTimeUtils'
import { FormattedHourlyData, getFormattedHourlyData } from '../../utils/ForecastDataUtils'

interface Props {
    show: boolean;
    day: number;
    data: APIForecastData
    units: WeatherUnits
}

const ForecastDayView = ({show, day, data, units}: Props) => {

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
                <h3>{localFormattedDay}</h3>
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
