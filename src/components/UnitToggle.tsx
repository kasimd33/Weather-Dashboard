import { Thermometer } from 'lucide-react'
import { useUnit } from '../contexts/UnitContext'

export function UnitToggle() {
  const { unit, toggleUnit, symbol } = useUnit()

  return (
    <button
      type="button"
      onClick={toggleUnit}
      aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 shadow-sm backdrop-blur-md transition hover:bg-white/20"
    >
      <Thermometer className="h-4 w-4 text-sky-400" />
      <span>{symbol}</span>
      <span className="text-slate-400">|</span>
      <span className="text-slate-400">
        {unit === 'celsius' ? '°F' : '°C'}
      </span>
    </button>
  )
}
