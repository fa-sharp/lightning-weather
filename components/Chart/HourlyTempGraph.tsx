import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react'
import styles from './HourlyTempGraph.module.scss'

interface Props {
    
}

const HourlyTempGraph = (props: Props) => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const context = chartRef.current?.getContext("2d");
        if (!context)
            return;

        const tempGraph = new Chart(context, {
            type: "line",
            data: {
                labels: ["8am", "9am", "10am", "11am", "12pm", "1pm"],
                datasets: [
                    { data: [50, 60, 70, 68, 65, 70] }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => item.formattedValue + " °F"
                        }
                    }
                }
            }
        })

        
    }, [chartRef])

    return (
        <div className={styles.graphContainer}>
            <canvas ref={chartRef} />
        </div>
    )
}

export default HourlyTempGraph
