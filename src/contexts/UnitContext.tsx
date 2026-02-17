import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type TempUnit = 'celsius' | 'fahrenheit'

interface UnitContextType {
  unit: TempUnit
  setUnit: (unit: TempUnit) => void
  toggleUnit: () => void
  symbol: string
}

const UnitContext = createContext<UnitContextType | null>(null)

const STORAGE_KEY = 'weather-dashboard-unit'

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<TempUnit>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return (stored === 'fahrenheit' ? 'fahrenheit' : 'celsius') as TempUnit
    } catch {
      return 'celsius'
    }
  })

  const setUnit = useCallback((newUnit: TempUnit) => {
    setUnitState(newUnit)
    try {
      localStorage.setItem(STORAGE_KEY, newUnit)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleUnit = useCallback(() => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')
  }, [unit, setUnit])

  const symbol = unit === 'celsius' ? '°C' : '°F'

  return (
    <UnitContext.Provider value={{ unit, setUnit, toggleUnit, symbol }}>
      {children}
    </UnitContext.Provider>
  )
}

export function useUnit() {
  const ctx = useContext(UnitContext)
  if (!ctx) throw new Error('useUnit must be used within UnitProvider')
  return ctx
}
