import React from 'react'
import { FormattedDailyDataType } from '../../utils/ForecastDataUtils'
import { NUM_FORECAST_DAYS } from './Forecast'

import styles from './WeatherDisplay.module.scss'

interface Props {
    dailyData: FormattedDailyDataType;
    onShowDayForecast: (numDay: number) => void;
}

const ForecastDailyView = ({dailyData, onShowDayForecast}: Props) => 
    <>
        {dailyData.map((dayData, dayNum) => 
            createDayElement(dayData, dayNum, onShowDayForecast))}
    </>

const createDayElement = (dayData: FormattedDailyDataType[number], dayNum: number, onShowDayForecast: (numDay: number) => void) => {
    if (dayNum >= NUM_FORECAST_DAYS)
        return null;

    const { formattedDay, description, icon, main, minTemp, maxTempNoUnits } = dayData;

    return (
        <button className={styles.day} 
            key={dayNum} onClick={() => onShowDayForecast(dayNum)}>
            <h3>{formattedDay}</h3>
            <div className={styles.forecastIcon}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/icons/${icon}.png`} alt={main} />
            </div>
            {`${maxTempNoUnits} / ${minTemp}`}<br/>
            {description}
        </button>);
}

export default ForecastDailyView
