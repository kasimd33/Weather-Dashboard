import axios from 'axios'
import type { GeoLocation, WeatherForecastResponse, HistoricalWeatherResponse, AirQualityResponse } from '../types/weather'

const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1'
const WEATHER_BASE = 'https://api.open-meteo.com/v1'
const AIR_QUALITY_BASE = 'https://air-quality.api.open-meteo.com/v1'
const ARCHIVE_BASE = 'https://archive-api.open-meteo.com/v1'

const getApiParams = () => {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  return key ? { apikey: key } : {}
}

export const weatherService = {
  async searchCity(query: string): Promise<GeoLocation[]> {
    if (!query.trim()) return []
    const { data } = await axios.get<{ results?: GeoLocation[] }>(`${GEOCODING_BASE}/search`, {
      params: {
        name: query.trim(),
        count: 10,
        language: 'en',
        format: 'json',
        ...getApiParams(),
      },
    })
    return data.results ?? []
  },

  async getWeatherForecast(
    lat: number,
    lon: number,
    tempUnit: 'celsius' | 'fahrenheit' = 'celsius'
  ): Promise<WeatherForecastResponse> {
    const { data } = await axios.get<WeatherForecastResponse>(`${WEATHER_BASE}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'precipitation',
          'cloud_cover',
          'pressure_msl',
          'uv_index',
          'is_day',
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'uv_index_max',
          'sunrise',
          'sunset',
        ].join(','),
        timezone: 'auto',
        forecast_days: 7,
        temperature_unit: tempUnit,
        wind_speed_unit: 'kmh',
        ...getApiParams(),
      },
    })
    return data
  },

  async getHistoricalWeather(
    lat: number,
    lon: number,
    tempUnit: 'celsius' | 'fahrenheit' = 'celsius'
  ): Promise<HistoricalWeatherResponse> {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)

    const formatDate = (d: Date) => d.toISOString().split('T')[0]

    const { data } = await axios.get<HistoricalWeatherResponse>(`${ARCHIVE_BASE}/archive`, {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        hourly: 'temperature_2m',
        timezone: 'auto',
        temperature_unit: tempUnit,
        ...getApiParams(),
      },
    })
    return data
  },

  async getAirQuality(lat: number, lon: number): Promise<AirQualityResponse> {
    try {
      const { data } = await axios.get<AirQualityResponse>(`${AIR_QUALITY_BASE}/air-quality`, {
        params: {
          latitude: lat,
          longitude: lon,
          current: ['us_aqi', 'us_aqi_pm2_5', 'us_aqi_pm10', 'us_aqi_o3', 'us_aqi_no2'].join(','),
          ...getApiParams(),
        },
      })
      return data
    } catch {
      return { latitude: lat, longitude: lon }
    }
  },
}
