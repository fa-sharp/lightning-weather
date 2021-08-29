import { WeatherUnits } from "../data/DataTypes";

export const tempUnitsToString = (units: WeatherUnits) => units === WeatherUnits.IMPERIAL ? "° F" : "° C";


export const formatWindSpeed = (speed: number, units: WeatherUnits) => {
    if (units === WeatherUnits.IMPERIAL)
        return `${Math.round(speed)} mph`;
    else
        return `${Math.round(speed*3.6)} kph`;
}
