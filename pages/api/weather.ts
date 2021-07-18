import type { NextApiRequest, NextApiResponse } from 'next'

const APP_ID = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default async function weatherHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: { cityId, units } } = req;
    const url = `${BASE_URL}?id=${cityId}&appid=${APP_ID}&units=${units}`;

    await fetch(url)
        .then(
            weatherResponse =>
                weatherResponse.json().then(data =>
                    res.status(weatherResponse.status).send(data)),
            err => {
                res.status(404).json({ message: "Network/fetch error!", code: err.code});
            }
        );
}