export type City = {
    id: number;
    name: string;
    state: string;
    country: string;
    combinedName: string;
}

export enum WeatherUnits {
    IMPERIAL = "imperial",
    METRIC = "metric"
}