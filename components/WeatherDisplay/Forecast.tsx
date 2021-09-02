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

export const NUM_FORECAST_DAYS = 6;
const forecastClass = styles.forecast;

const Forecast = ({data, units, fetchError}: ForecastProps) => {

    const [showDayView, setShowDayView] = useState(false);
    const [dayInView, setDayInView] = useState(-1);

    /** User clicks on a day, to see the day detailed forecast (hourly, sunrise, etc.) */
    const onShowDayForecast = useCallback((numDay: number) => {
        setShowDayView(true);
        setDayInView(numDay);
    }, []);

    /** User clicks 'Back' in the day view, to go back to the daily forecast */
    const onExitDayForecast = useCallback(() => {
        setShowDayView(false);
        setDayInView(-1);
    }, []);

    /** In the day view, user navigates through the days */
    const onNavigateDayForecast = useCallback((direction: "next" | "prev") => {
        setDayInView(prevDay => (direction === "next") ? prevDay + 1 : prevDay - 1);
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

            <ForecastDayView show={showDayView} day={dayInView} data={data} units={units} onNavigate={onNavigateDayForecast} />
            {/* Back button for the day view (this should be moved into above component*/}
            {showDayView && 
                <button className={`${styles.controlButton} ${styles.backButton}`}
                    aria-label="Go back to daily forecast" title="Back to daily forecast"
                    onClick={onExitDayForecast}>
                    <span className="material-icons">keyboard_backspace</span>
                </button>}

            {daily.map((day, numDay) => {
                if (numDay >= NUM_FORECAST_DAYS)
                    return null;

                const { dt, temp: { min, max }, weather } = day;
                const { main, description, icon } = weather[0];

                return (
                    <button className={!showDayView ? styles.day : `${styles.day} ${styles.hidden}`} 
                        key={numDay} onClick={() => onShowDayForecast(numDay)}>
                        <h3>{getFormattedLocalDay(dt,timezone_offset)}</h3>
                        <div className={styles.forecastIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/icons/${icon}.png`} alt={main} />
                        </div>
                        {`${Math.round(max)} / ${Math.round(min)}${tempUnitsToString(units)}`}<br/>
                        {description}
                    </button>);
            })}
        </section>
    )
}

export default Forecast
