import React, { useCallback, useMemo, useState } from 'react'
import { APIForecastData, WeatherUnits } from '../../data/DataTypes'
import ForecastDayView from './ForecastDayView';
import ForecastDailyView from './ForecastDailyView';
import { LoadingSpinner } from '../Misc/LoadingSpinner';

import { getFormattedDailyData, getFormattedHourlyData } from '../../utils/ForecastDataUtils';

import styles from './WeatherDisplay.module.scss'

interface ForecastProps {
    data: APIForecastData | null
    units: WeatherUnits
    fetchError?: boolean
}

export const NUM_FORECAST_DAYS = 8;

const forecastDailyClass = `${styles.forecast} ${styles.dailyView}`
const forecastDayClass = `${styles.forecast} ${styles.dayView}`

const Forecast = ({data, units, fetchError}: ForecastProps) => {

    if (fetchError)
        return <div className={forecastDailyClass}>Failed to fetch forecast 😭</div>

    else if (!data)
        return <div className={forecastDailyClass}>
            <div>Loading forecast... <LoadingSpinner /></div>
        </div>
    else
        return <ForecastElement data={data} units={units} />
}

const ForecastElement = ({data, units}: {data: APIForecastData, units: WeatherUnits}) => {

    const [showDayView, setShowDayView] = useState(false);
    const [dayInView, setDayInView] = useState(0);

    const { daily, hourly, timezone_offset } = data;
    const dailyData = useMemo(() => getFormattedDailyData(daily, timezone_offset, units), [daily, timezone_offset, units]);
    const hourlyData = useMemo(() => getFormattedHourlyData(hourly, timezone_offset, units), [hourly, timezone_offset, units]);

    /** User clicks on a day, to see the day's detailed forecast (hourly, sunrise, etc.) */
    const onShowDayView = useCallback((numDay: number) => {
        setDayInView(numDay);
        setShowDayView(true);
    }, []);

    /** User clicks 'Back' in the day view, to go back to the daily forecast */
    const onExitDayView = useCallback(() => {
        setShowDayView(false);
    }, []);

    /** In the day view, user navigates through the days */
    const onNavigateDayView = useCallback((direction: "next" | "prev") => {
        setDayInView(prevDay => (direction === "next") ? prevDay + 1 : prevDay - 1);
    }, []);

    return (
        <section className={`${styles.forecast} ${showDayView ? forecastDayClass : forecastDailyClass}`} aria-label="Forecast">
            {!showDayView ? 
                <ForecastDailyView 
                    dailyData={dailyData} 
                    onShowDayForecast={onShowDayView} />
                : 
                <ForecastDayView 
                    numDay={dayInView} 
                    dailyData={dailyData} 
                    hourlyData={hourlyData} 
                    units={units} 
                    onNavigate={onNavigateDayView} 
                    onExitDayView={onExitDayView} />}
        </section>
    )
}

export default Forecast