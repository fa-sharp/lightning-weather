import { APIForecastHour, WeatherUnits } from "../data/DataTypes";
import { getFormattedLocalDay, getFormattedLocalHour, getLocalDay, getLocalHour } from "./DateTimeUtils";
import { formatPercentage, formatTemp, formatWindSpeed } from "./UnitUtils";

const {METRIC, IMPERIAL} = WeatherUnits;

export const getFormattedHourlyData = (hourly: APIForecastHour[], timeOffset: number, units: WeatherUnits) =>
    hourly.map(hourData => {
        const { dt, weather, wind_speed, clouds } = hourData;
        const { description } = weather[0];

        const day = getLocalDay(dt, timeOffset);
        const formattedDay = getFormattedLocalDay(dt, timeOffset);
        const hour = getLocalHour(dt, timeOffset);
        const formattedHour = getFormattedLocalHour(dt, timeOffset);
        const temp = Math.round(hourData.temp);
        const formattedTemp = formatTemp(temp, units);
        const formattedWind = formatWindSpeed(wind_speed, units);
        const formattedClouds = formatPercentage(clouds);

        return { day, hour, formattedDay, formattedHour, temp, formattedTemp, formattedWind, formattedClouds, description }
    });

export type FormattedHourlyData = ReturnType<typeof getFormattedHourlyData>;