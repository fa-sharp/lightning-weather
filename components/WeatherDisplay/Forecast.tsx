import React, { useCallback, useState } from 'react'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import { getFormattedLocalDay } from '../../utils/DateTimeUtils';
import styles from './WeatherDisplay.module.scss'
import { LoadingSpinner } from '../Misc/LoadingSpinner';
import ForecastDayView from './ForecastDayView';
import { tempUnitsToString } from '../../utils/UnitUtils';

interface ForecastProps {
    data: APIForecastData
    units: WeatherUnits
    fetchError?: boolean
}

const NUM_FORECAST_DAYS = 6;
const forecastClass = styles.forecast;

const Forecast = ({data, units, fetchError}: ForecastProps) => {

    const [showDayView, setShowDayView] = useState(false);
    const [dayInView, setDayInView] = useState(-1);

    const onClickDay = useCallback((numDay: number) => {
        setShowDayView(true);
        setDayInView(numDay);
    }, []);

    if (fetchError)
        return <div className={forecastClass}>Failed to fetch forecast 😭</div>
    else if (!data)
        return <div className={forecastClass}>
            <div>Loading forecast... <LoadingSpinner /></div>
        </div>

    const { daily, timezone_offset } = data;

    return (
        <section className={styles.forecast} aria-label="Forecast">

            <ForecastDayView show={showDayView} day={dayInView} data={data} units={units} />

            {daily.map((day, numDay) => {
                if (numDay >= NUM_FORECAST_DAYS)
                    return null;

                const { dt, temp: { min, max }, weather } = day;
                const { main, description, icon } = weather[0];

                return (
                    <article className={!showDayView ? styles.day : `${styles.day} ${styles.hidden}`} 
                        key={numDay} onClick={() => onClickDay(numDay)}>
                        <h3>{getFormattedLocalDay(dt,timezone_offset)}</h3>
                        <div className={styles.forecastIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/icons/${icon}.png`} alt={main} />
                        </div>
                        {`${Math.round(max)} / ${Math.round(min)}${tempUnitsToString(units)}`}<br/>
                        {description}
                    </article>);
            })}
        </section>
    )
}

export default Forecast
