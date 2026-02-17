import { motion } from 'framer-motion'
import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { useUnit } from '../contexts/UnitContext'
import { getWeatherInfo } from '../utils/weatherCodes'
import type { DailyForecast } from '../types/weather'

interface ForecastListProps {
  daily: DailyForecast[]
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) return 'Today'
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return DAY_NAMES[date.getDay()]
}

function getForecastIcon(code: number) {
  const { icon } = getWeatherInfo(code)
  if (icon.includes('rain')) return CloudRain
  if (icon.includes('snow')) return CloudSnow
  if (icon.includes('sun') && !icon.includes('cloud')) return Sun
  return Cloud
}

export function ForecastList({ daily }: ForecastListProps) {
  const { symbol } = useUnit()

  if (!daily?.length) return null

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-100">
        7-Day Forecast
      </h2>
      <div className="-mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
        <div className="flex gap-3">
          {daily.map((day, index) => {
            const Icon = getForecastIcon(day.weather_code)
            return (
              <motion.div
                key={day.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                className="flex min-w-[120px] max-w-[140px] flex-shrink-0 flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md"
              >
                <p className="mb-2 text-sm font-medium text-slate-300">
                  {getDayLabel(day.time)}
                </p>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/20">
                  <Icon className="h-6 w-6 text-sky-400" />
                </div>
                <p className="text-lg font-bold text-slate-100">
                  {Math.round(day.temperature_2m_max)}
                  {symbol}
                </p>
                <p className="text-sm text-slate-400">
                  {Math.round(day.temperature_2m_min)}
                  {symbol}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {Math.round(day.precipitation_probability_max)}% rain
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
