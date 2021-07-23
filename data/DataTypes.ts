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

export type UserOptions = {
    /** Whether to use metric or imperial units */
    units: WeatherUnits;

    /** Whether to use more colors in the weather app */
    withColor: boolean;
}

export type ChangeUserOption = <T extends keyof UserOptions>(option: T, newValue: UserOptions[T]) => void;