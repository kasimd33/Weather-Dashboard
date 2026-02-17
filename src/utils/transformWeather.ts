import type { DailyForecast, WeatherForecastResponse } from '../types/weather'

export function transformDailyForecast(weather: WeatherForecastResponse): DailyForecast[] {
  const daily = weather.daily
  if (!daily?.time?.length) return []

  return daily.time.map((time, i) => ({
    time,
    weather_code: daily.weather_code[i] ?? 0,
    temperature_2m_max: daily.temperature_2m_max[i] ?? 0,
    temperature_2m_min: daily.temperature_2m_min[i] ?? 0,
    apparent_temperature_max: daily.apparent_temperature_max[i] ?? 0,
    apparent_temperature_min: daily.apparent_temperature_min[i] ?? 0,
    precipitation_sum: daily.precipitation_sum[i] ?? 0,
    precipitation_probability_max: daily.precipitation_probability_max[i] ?? 0,
    wind_speed_10m_max: daily.wind_speed_10m_max[i] ?? 0,
    uv_index_max: daily.uv_index_max[i] ?? 0,
    sunrise: daily.sunrise[i] ?? '',
    sunset: daily.sunset[i] ?? '',
  }))
}
