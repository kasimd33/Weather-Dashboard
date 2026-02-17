const LAST_CITY_KEY = 'weather-dashboard-last-city'

export function getLastSearchedCity(): string {
  try {
    return localStorage.getItem(LAST_CITY_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setLastSearchedCity(city: string): void {
  try {
    localStorage.setItem(LAST_CITY_KEY, city)
  } catch {
    /* ignore */
  }
}
