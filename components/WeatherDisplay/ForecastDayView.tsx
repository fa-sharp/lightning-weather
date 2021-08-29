import React from 'react'
import styles from './WeatherDisplay.module.scss'
import HourlyTempGraph from '../Chart/HourlyTempGraph'

interface Props {
    show: boolean;
    day: number;
}

const ForecastDayView = (props: Props) => {
    return !props.show ? null :

        <div className={styles.dayView}>
            Day {props.day}
            <HourlyTempGraph />
        </div>
}

export default ForecastDayView
