import { MapPinOff } from 'lucide-react'

interface CityNotFoundProps {
  query?: string
}

export function CityNotFound({ query }: CityNotFoundProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-12 backdrop-blur-md">
      <MapPinOff className="mb-4 h-16 w-16 text-slate-400" />
      <h3 className="mb-2 text-xl font-semibold text-slate-200">
        City Not Found
      </h3>
      <p className="max-w-sm text-center text-slate-400">
        {query
          ? `We couldn't find weather data for "${query}". Try a different city name or check the spelling.`
          : 'Search for a city to see its weather. Try "London", "Tokyo", or "New York".'}
      </p>
    </div>
  )
}
