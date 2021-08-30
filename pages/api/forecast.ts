import type { NextApiRequest, NextApiResponse } from 'next'

const APP_ID = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
const STATIC_QUERIES = `exclude=current,minutely&appid=${APP_ID}`;

export default async function forecastHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: { lat, lon, units } } = req;

    // verify query parameters
    if (!lat || !lon || !units) {
        res.status(400).json({message: "Missing query params! Make sure lat, lon, and units are all included."});
        return;
    }

    const url = `${BASE_URL}?${STATIC_QUERIES}&lat=${lat}&lon=${lon}&units=${units}`;

    await fetch(url)
        .then(
            weatherResponse =>
                weatherResponse.json().then(data =>
                    res.status(weatherResponse.status).send(data)),
            err => {
                res.status(404).json({ message: "Network/fetch error!", code: err.code });
            }
        );
}