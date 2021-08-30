import React from 'react'
import styles from './WeatherDisplay.module.scss'
import HourlyTempGraph from '../Chart/HourlyTempGraph'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import { getCurrentLocalHour, getFormattedLocalDay, getLocalDay } from '../../utils/DateTimeUtils'
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
    const localFormattedDay = getFormattedLocalDay(daily[day].dt, timezone_offset);

    if (day < 2) { // if the first two days, we'll display an hourly graph
        
        const hourlyData = getFormattedHourlyData(hourly, timezone_offset);
        
        let dataToDisplay: FormattedHourlyData | null;
        
        if (day === 0 && getCurrentLocalHour(timezone_offset) < 6) // if current time is between midnight and 6am, show the upcoming day's data
            dataToDisplay = hourlyData.filter(hourData => hourData.day === localDay && hourData.hour >= 6 && hourData.hour < 18);
        
        else if (day === 0) // otherwise, show the next 12 hours
            dataToDisplay = hourlyData.slice(0, 12);
        else
            dataToDisplay = null;

        return (
            <div className={styles.dayView}>
                <h3>{localFormattedDay}</h3>
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
