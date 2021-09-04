import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react'
import { WeatherUnits } from '../../data/DataTypes';
import { FormattedHourlyDataType } from '../../utils/ForecastDataUtils';
import styles from './HourlyTempGraph.module.scss'

interface Props {
    hourlyData: FormattedHourlyDataType
    units: WeatherUnits
}

const HourlyTempGraph = ({hourlyData, units}: Props) => {

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
                    { 
                        data: hourlyData.map(hourData => hourData.temp),
                        tension: 0.3,
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-medium'),
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-light')
                    }
                ]
            },
            options: {
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    'y': {
                        ticks: {
                            format: {
                                style: 'unit',
                                unit: units === WeatherUnits.IMPERIAL ? "fahrenheit" : "celsius",
                                unitDisplay: 'narrow',
                                notation: 'compact'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false,
                        callbacks: {  
                            label: (item) => {
                                const {formattedTemp, formattedWind, formattedClouds, description} = hourlyData[item.dataIndex];
                                return [
                                    formattedTemp,
                                    description,
                                    `Wind: ${formattedWind}`,
                                    `Clouds: ${formattedClouds}`,
                                ]
                            }
                        }
                    }
                }
            }
        });

        return () => tempGraph.destroy();
        
    }, [chartRef, hourlyData, units])

    return (
        <div className={styles.graphContainer}>
            <canvas ref={chartRef} aria-label="Hourly Forecast">
                {stringifyHourlyData(hourlyData)}
            </canvas>
        </div>
    )
}

/** Create fallback text of hourly data for accessibility */
const stringifyHourlyData = (dataToDisplay: FormattedHourlyDataType) =>
    dataToDisplay.reduce((fallbackText, hourData) => {
        fallbackText += `${hourData.formattedHour}: ${hourData.formattedTemp}, `;
        return fallbackText;
    }, "")



export default HourlyTempGraph