import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react'
import { WeatherUnits } from '../../data/DataTypes';
import { FormattedHourlyData } from '../../utils/ForecastDataUtils';
import { tempUnitsToString } from '../../utils/UnitUtils';
import styles from './HourlyTempGraph.module.scss'

interface Props {
    dataToDisplay: FormattedHourlyData | null
    units: WeatherUnits
}

const HourlyTempGraph = ({dataToDisplay: hourlyData, units}: Props) => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const context = chartRef.current?.getContext("2d");
        if (!context || !hourlyData)
            return;

        const tempGraph = new Chart(context, {
            type: "line",
            data: {
                labels: hourlyData.map(hourData => hourData.formattedHour),
                datasets: [
                    { data: hourlyData.map(hourData => hourData.temp) }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => [item.formattedValue + tempUnitsToString(units), hourlyData[item.dataIndex].description]
                        }
                    }
                }
            }
        })

        return () => tempGraph.destroy();
        
    }, [chartRef, hourlyData, units])

    return !hourlyData ? null :
    (
        <div className={styles.graphContainer}>
            <canvas ref={chartRef} aria-label="Hourly Forecast">
                {stringifyHourlyData(hourlyData)}
            </canvas>
        </div>
    )
}

/** Create fallback text of hourly data for accessibility */
const stringifyHourlyData = (dataToDisplay: FormattedHourlyData) =>
    dataToDisplay.reduce((fallbackText, hourData) => {
        fallbackText += `${hourData.formattedHour}: ${hourData.temp}, `;
        return fallbackText;
    }, "")



export default HourlyTempGraph