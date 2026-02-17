import { useState, useRef, useEffect } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { weatherService } from '../api/weatherService'
import { useDebounce } from '../hooks/useDebounce'
import type { GeoLocation } from '../types/weather'
import { setLastSearchedCity } from '../utils/storage'

interface SearchBarProps {
  onSelectLocation: (location: GeoLocation) => void
  placeholder?: string
}

export function SearchBar({ onSelectLocation, placeholder = 'Search city...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debouncedSearch = useDebounce(query, 500)

  const { data: results = [], isFetching } = useQuery({
    queryKey: ['city-search', debouncedSearch],
    queryFn: () => weatherService.searchCity(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 60_000,
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (location: GeoLocation) => {
    setLastSearchedCity(`${location.name}, ${location.country}`)
    onSelectLocation(location)
    setQuery('')
    setIsOpen(false)
  }

  const showDropdown = isOpen && (query.length >= 2 || results.length > 0)

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-slate-100 shadow-sm backdrop-blur-md transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 placeholder:text-slate-400"
          autoComplete="off"
        />
        {isFetching && (
          <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-sky-400" />
        )}
      </div>

      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-white/20 bg-slate-800/95 shadow-xl backdrop-blur-md">
          {results.length === 0 && !isFetching ? (
            <li className="px-4 py-6 text-center text-sm text-slate-400">No cities found</li>
          ) : (
            results.map((loc) => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-white/10"
                >
                  <span className="font-medium text-slate-100">{loc.name}</span>
                  {loc.admin1 && (
                    <span className="text-slate-400">, {loc.admin1}</span>
                  )}
                  <span className="text-slate-400"> — {loc.country}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
