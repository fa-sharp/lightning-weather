import type { NextApiRequest, NextApiResponse } from 'next'

const APP_ID = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default async function weatherHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: { cityId, lat, lon, units } } = req;
    const url = typeof cityId === 'string' ?
        `${BASE_URL}?id=${cityId}&appid=${APP_ID}&units=${units}`
        : typeof lat === 'string' && typeof lon === 'string' ?
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${units}`
            : null;

    if (!url) return res.status(400).json({ message: "Invalid request!" });

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