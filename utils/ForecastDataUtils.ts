import { APIForecastDay, APIForecastHour, WeatherUnits } from "../data/DataTypes";
import { getFormattedLocalDay, getFormattedLocalDayLong, getFormattedLocalHour, getFormattedLocalTime, getLocalDay, getLocalHour } from "./DateTimeUtils";
import { formatNumber, formatPercentage, formatMM, formatTemp, formatWindSpeed } from "./UnitUtils";

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

export type FormattedHourlyDataType = ReturnType<typeof getFormattedHourlyData>;

export const getFormattedDailyData = (daily: APIForecastDay[], timeOffset: number, units: WeatherUnits) => 
    daily.map(dayData => {
        const { dt, temp, weather, humidity, clouds, wind_speed, sunrise, sunset, moon_phase, rain, snow } = dayData;
        const { description, icon, main } = weather[0];

        return {
            day: getLocalDay(dt, timeOffset),
            formattedDay: getFormattedLocalDay(dt, timeOffset),
            formattedDayLong: getFormattedLocalDayLong(dt, timeOffset),

            description, icon, main,
            humidity: formatPercentage(humidity),
            rain: rain ? formatMM(rain, units) : undefined,
            snow: snow ? formatMM(snow, units) : undefined,
            clouds: formatPercentage(clouds),
            wind: formatWindSpeed(wind_speed, units),
            
            minTemp: formatTemp(temp.min, units),
            minTempNoUnits: formatNumber(Math.round(temp.min)),
            maxTemp: formatTemp(temp.max, units),
            maxTempNoUnits: formatNumber(Math.round(temp.max)),
            morningTemp: formatTemp(temp.morn, units),
            afternoonTemp: formatTemp(temp.day, units),
            eveningTemp: formatTemp(temp.eve, units),
            nightTemp: formatTemp(temp.night, units),

            sunriseTime: getFormattedLocalTime(sunrise, timeOffset),
            sunsetTime: getFormattedLocalTime(sunset, timeOffset)
        }
    })


export type FormattedDailyDataType = ReturnType<typeof getFormattedDailyData>;
