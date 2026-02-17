import { motion } from 'framer-motion'
import {
  Cloud,
  Droplets,
  Wind,
  Sun,
  Gauge,
} from 'lucide-react'
import { useUnit } from '../contexts/UnitContext'
import { getWeatherInfo } from '../utils/weatherCodes'
import type { WeatherForecastResponse } from '../types/weather'
import type { AirQualityResponse } from '../types/weather'


interface CurrentWeatherProps {
  weather: WeatherForecastResponse
  airQuality?: AirQualityResponse | null
  cityName: string
}

const weatherIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  cloud: Cloud,
  'cloud-sun': Cloud,
  'cloud-rain': Cloud,
  'cloud-snow': Cloud,
  'cloud-drizzle': Cloud,
  'cloud-fog': Cloud,
  'cloud-lightning': Cloud,
}

export function CurrentWeather({ weather, airQuality, cityName }: CurrentWeatherProps) {
  const { symbol } = useUnit()
  const current = weather.current
  if (!current) return null

  const info = getWeatherInfo(current.weather_code)
  const IconComponent = weatherIcons[info.icon] ?? Cloud

  const aqi = airQuality?.current?.us_aqi
  const aqiLabel =
    aqi == null
      ? 'N/A'
      : aqi <= 50
        ? 'Good'
        : aqi <= 100
          ? 'Moderate'
          : aqi <= 150
            ? 'Unhealthy'
            : 'Very Unhealthy'

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${current.relative_humidity_2m}%` },
    { icon: Wind, label: 'Wind', value: `${Math.round(current.wind_speed_10m)} km/h` },
    {
      icon: Sun,
      label: 'UV Index',
      value: current.uv_index != null ? String(Math.round(current.uv_index)) : 'N/A',
    },
    {
      icon: Gauge,
      label: 'Air Quality',
      value: aqiLabel,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md text-slate-100 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-300">{cityName}</p>
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-400/20">
              <IconComponent className="h-8 w-8 text-sky-400" />
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
                {Math.round(current.temperature_2m)}
                {symbol}
              </p>
              <p className="text-slate-300">{info.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                Feels like {Math.round(current.apparent_temperature)}
                {symbol}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/30">
                <Icon className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">{label}</p>
                <p className="font-semibold text-slate-100">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
