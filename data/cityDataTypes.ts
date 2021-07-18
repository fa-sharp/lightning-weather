export type CityDataType = {
    id: number;
    name: string;
    state: string;
    country: string;
}

export type CityCombinedDataType = CityDataType & {
    combinedName: string;
}