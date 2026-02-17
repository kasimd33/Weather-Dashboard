export interface GeoLocation {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export interface CurrentWeather {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
  wind_direction_10m: number
  precipitation: number
  cloud_cover: number
  pressure_msl: number
  is_day: number
}

export interface DailyForecast {
  time: string
  weather_code: number
  temperature_2m_max: number
  temperature_2m_min: number
  apparent_temperature_max: number
  apparent_temperature_min: number
  precipitation_sum: number
  precipitation_probability_max: number
  wind_speed_10m_max: number
  uv_index_max: number
  sunrise: string
  sunset: string
}

export interface HourlyHistory {
  time: string
  temperature_2m: number
}

export interface AirQuality {
  us_aqi: number
  us_aqi_pm2_5: number
  us_aqi_pm10: number
  us_aqi_o3: number
  us_aqi_no2: number
}

export interface WeatherForecastResponse {
  latitude: number
  longitude: number
  timezone: string
  current?: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    precipitation: number
    cloud_cover: number
    pressure_msl: number
    uv_index?: number
    is_day: number
  }
  daily?: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    precipitation_sum: number[]
    precipitation_probability_max: number[]
    wind_speed_10m_max: number[]
    uv_index_max: number[]
    sunrise: string[]
    sunset: string[]
  }
  hourly?: {
    time: string[]
    temperature_2m: number[]
  }
}

export interface HistoricalWeatherResponse {
  latitude: number
  longitude: number
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
}

export interface AirQualityResponse {
  latitude: number
  longitude: number
  current?: {
    us_aqi: number
    us_aqi_pm2_5: number
    us_aqi_pm10: number
    us_aqi_o3: number
    us_aqi_no2: number
  }
}
