import cityListJson from "./city.list.min.json";

export type CityDataType = {
    id: number;
    name: string;
    state: string;
    country: string;
}

export type CityCombinedDataType = {
    id: number;
    combinedName: string;
}

const cityList = cityListJson as CityDataType[];
const citySearchList: CityCombinedDataType[] = cityList.map(city => {
    return {combinedName: `${city.name}, ${city.state === "" ? "" : city.state + ", "}${city.country}`, id: city.id};
});

/** Searches all city names with the given string and returns up to 10 cities. No matching case by default */
export const searchCityName = (searchQuery: string) => 
    citySearchList
        .filter(cityData => cityData.combinedName.toLowerCase().startsWith(searchQuery.toLowerCase()))
        .slice(0,9);