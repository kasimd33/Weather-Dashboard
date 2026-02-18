import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { GeoLocation } from '../types/weather'

// Fix Leaflet default marker in Vite
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

interface LocationMapProps {
  location: GeoLocation
}

export function LocationMap({ location }: LocationMapProps) {
  const center: [number, number] = [location.latitude, location.longitude]
  const cityName = `${location.name}, ${location.country}`

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-md">
      <MapContainer
        center={center}
        zoom={13}
        className="h-[220px] w-full rounded-2xl"
        scrollWheelZoom={false}
      >
        <MapUpdater center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={icon}>
          <Popup>{cityName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
