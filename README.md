# Weather Dashboard

A professional-grade weather dashboard built with React, Vite, Tailwind CSS, and TanStack Query.

## Features

- **Search** – City search with local storage to remember your last searched city
- **Current Weather** – Hero card with temperature, condition, humidity, wind speed, UV index, and air quality
- **7-Day Forecast** – Horizontal scrollable forecast list
- **Weather History** – Line chart showing temperature trends for the past 7 days
- **Unit Toggle** – Switch between Celsius and Fahrenheit (Context API, persisted)
- **Skeleton Loaders** – For current weather and charts while fetching
- **Error Handling** – Error boundaries and "City Not Found" empty states
- **Responsive** – Mobile-first design

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Axios
- Recharts
- Lucide React

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (optional – Open-Meteo works without an API key for non-commercial use):

```bash
cp .env.example .env
```

Add your API key to `.env` if using a commercial or alternative API:

```
VITE_WEATHER_API_KEY=your_key_here
```

3. Start the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## API

This app uses [Open-Meteo](https://open-meteo.com/) APIs (no key required for non-commercial use):

- Geocoding API – City search
- Forecast API – Current weather and 7-day forecast
- Archive API – Historical weather data (past 7 days)
- Air Quality API – AQI data
