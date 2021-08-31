export type City = {
    id: number;
    name: string;
    state: string;
    country: string;
    combinedName: string;
    /** The normalized combinedName (removing accents and other special characters), enabling better/faster searching */
    normalized: string;
    coord: { lat: number, lon: number };
}

export enum WeatherUnits {
    IMPERIAL = "imperial",
    METRIC = "metric"
}

export type UserOptions = {
    /** Whether to use metric or imperial units */
    units: WeatherUnits;

    /** Whether to use more colors in the weather app */
    withColor: boolean;
}

export type ChangeUserOption = <T extends keyof UserOptions>(option: T, newValue: UserOptions[T]) => void;

export type APIForecastData = {
    timezone_offset: number
    daily: APIForecastDay[]
    hourly: APIForecastHour[]
}

export type APIForecastDay = {
    dt: number
    temp: { min: number, max: number };
    weather: APIWeatherCondition[]
}

export type APIForecastHour = {
    dt: number
    temp: number
    wind_speed: number
    clouds: number
    feels_like: number
    weather: APIWeatherCondition[]
}

export type APIWeatherCondition = {
    main: string
    description: string
    icon: string
}