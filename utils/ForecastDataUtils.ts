import { APIForecastHour } from "../data/DataTypes";
import { getFormattedLocalDay, getFormattedLocalHour, getLocalDay, getLocalHour } from "./DateTimeUtils";

export const getFormattedHourlyData = (hourly: APIForecastHour[], timeOffset: number) =>
    hourly.map(hourData => {
        const day = getLocalDay(hourData.dt, timeOffset);
        const formattedDay = getFormattedLocalDay(hourData.dt, timeOffset);
        const hour = getLocalHour(hourData.dt, timeOffset);
        const formattedHour = getFormattedLocalHour(hourData.dt, timeOffset);

        return { day, hour, formattedDay, formattedHour, temp: Math.round(hourData.temp), description: hourData.weather[0].description }
    });

export type FormattedHourlyData = ReturnType<typeof getFormattedHourlyData>;