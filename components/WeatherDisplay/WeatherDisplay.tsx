import React from 'react'
import { CityCombinedDataType } from '../../data/cityDataUtil'
import useWeatherFetch from '../../data/useWeatherFetch'

interface WeatherDisplayProps {
    city: CityCombinedDataType;
}

const WeatherDisplay = ({ city }: WeatherDisplayProps) => {

    const [data, error] = useWeatherFetch(city.id, "imperial");

    return (
        !city ? null :
            <div>
                Name: {city.name}
                <br />
                Country: {city.country}
                <br />
                Data: {error ? "Failed to load"
                        : !data ? "Loading..."
                        : <div>
                            Temp: {data.main.temp}<br />
                            Condition: {data.weather[0].main}<br />
                            Description: {data.weather[0].description}
                        </div>
                        }
            </div>
    )
}

export default WeatherDisplay
