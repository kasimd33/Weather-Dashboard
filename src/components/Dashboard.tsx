import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar'
import { UnitToggle } from './UnitToggle'
import { CurrentWeather } from './CurrentWeather'
import { CurrentWeatherSkeleton } from './CurrentWeatherSkeleton'
import { ForecastList } from './ForecastList'
import { WeatherHistoryChart } from './WeatherHistoryChart'
import { CityNotFound } from './CityNotFound'
import { ErrorBoundary } from './ErrorBoundary'
import { weatherService } from '../api/weatherService'
import { useUnit } from '../contexts/UnitContext'
import { getLastSearchedCity } from '../utils/storage'
import { transformDailyForecast } from '../utils/transformWeather'
import type { GeoLocation } from '../types/weather'

export function Dashboard() {
  const { unit } = useUnit()
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [initialSearchDone, setInitialSearchDone] = useState(false)

  // Restore last searched city on mount
  useEffect(() => {
    const lastCity = getLastSearchedCity()
    if (!lastCity?.trim()) {
      setInitialSearchDone(true)
      return
    }
    const [name] = lastCity.split(',')
    if (!name?.trim()) {
      setInitialSearchDone(true)
      return
    }
    weatherService
      .searchCity(name.trim())
      .then((results) => {
        if (results.length > 0) setLocation(results[0])
        setInitialSearchDone(true)
      })
      .catch(() => setInitialSearchDone(true))
  }, [])

  const forecastQuery = useQuery({
    queryKey: ['weather-forecast', location?.latitude, location?.longitude, unit],
    queryFn: () =>
      location
        ? weatherService.getWeatherForecast(location.latitude, location.longitude, unit)
        : Promise.reject(new Error('No location')),
    enabled: !!location,
    retry: 1,
  })

  const historyQuery = useQuery({
    queryKey: ['weather-history', location?.latitude, location?.longitude, unit],
    queryFn: () =>
      location
        ? weatherService.getHistoricalWeather(location.latitude, location.longitude, unit)
        : Promise.resolve(null),
    enabled: !!location,
    retry: 1,
  })

  const airQualityQuery = useQuery({
    queryKey: ['air-quality', location?.latitude, location?.longitude],
    queryFn: () =>
      location
        ? weatherService.getAirQuality(location.latitude, location.longitude)
        : Promise.resolve(null),
    enabled: !!location,
    retry: 0,
  })

  const cityName = location ? `${location.name}, ${location.country}` : ''
  const daily = forecastQuery.data ? transformDailyForecast(forecastQuery.data) : []

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">
              Weather Dashboard
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar
              onSelectLocation={setLocation}
              placeholder={getLastSearchedCity() || 'Search city...'}
            />
            <UnitToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {!location && initialSearchDone ? (
          <CityNotFound />
        ) : !location ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-slate-400">Loading your last search...</p>
          </div>
        ) : forecastQuery.isError ? (
          <CityNotFound query={cityName} />
        ) : (
          <>
            <ErrorBoundary>
              {forecastQuery.isLoading ? (
                <CurrentWeatherSkeleton />
              ) : forecastQuery.data?.current ? (
                <CurrentWeather
                  weather={forecastQuery.data}
                  airQuality={airQualityQuery.data}
                  cityName={cityName}
                />
              ) : null}
            </ErrorBoundary>

            {daily.length > 0 && (
              <ErrorBoundary>
                <ForecastList daily={daily} />
              </ErrorBoundary>
            )}

            <ErrorBoundary>
              <WeatherHistoryChart
                data={historyQuery.data ?? null}
                isLoading={historyQuery.isLoading}
              />
            </ErrorBoundary>
          </>
        )}
      </main>
    </div>
  )
}
