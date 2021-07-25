# ⚡️ Lightning Weather
A weather app created with [Next.js](https://nextjs.org/) and React.

## Features
- Displays the current weather and forecast data from OpenWeatherMap
- User can customize the home screen to show up to four cities
- Search for any city/town in the world (if OpenWeatherMap has it in their database)
- The app uses Next.js's
[API routes](https://nextjs.org/docs/api-routes/introduction) to fetch weather data and forecast data from OpenWeatherMap on the server side.
- Data is fetched and cached on the client side using [useSWR](https://swr.vercel.app/)
- User settings (metric/imperial and visual options) are stored in browser's Local Storage


## Building locally
To build/run the app locally, you will need an API key from [OpenWeatherMap](https://openweathermap.org/api). Store it in a `.env.local` file in the root folder, containing ```OPENWEATHER_API_KEY=(your_key_here)```. This will set up the API key as an Environment Variable for Next.js.


Then, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can build the app with:

```bash
npm run build
```