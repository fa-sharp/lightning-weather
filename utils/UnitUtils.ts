import { WeatherUnits } from "../data/DataTypes";

const { IMPERIAL } = WeatherUnits;

const fahrenheitFormatter = new Intl.NumberFormat('default', {
    style: 'unit', unit: "fahrenheit", notation: 'compact'
});

const celsiusFormatter = new Intl.NumberFormat('default', {
    style: 'unit', unit: "celsius", notation: 'compact'
});

const mphFormatter = new Intl.NumberFormat('default', {
    style: 'unit', unit: "mile-per-hour", notation: 'compact'
});

const kphFormatter = new Intl.NumberFormat('default', {
    style: 'unit', unit: "kilometer-per-hour", notation: 'compact'
});

const percentFormatter = new Intl.NumberFormat('default', {
    style: 'unit', unit: "percent", notation: 'compact'
});

export const formatTemp = (temp: number, units: WeatherUnits) => 
    (units === IMPERIAL) ? fahrenheitFormatter.format(temp) : celsiusFormatter.format(temp)

export const tempUnitsToString = (units: WeatherUnits) => 
    (units === IMPERIAL) ? "° F" : "° C"

export const formatWindSpeed = (speed: number, units: WeatherUnits) =>
    (units === IMPERIAL) ? mphFormatter.format(speed) : kphFormatter.format(speed*3.6)

export const formatPercentage = (percent: number) => percentFormatter.format(percent);
