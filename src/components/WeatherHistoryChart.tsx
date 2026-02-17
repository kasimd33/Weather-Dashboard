import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { useUnit } from '../contexts/UnitContext'
import type { HistoricalWeatherResponse } from '../types/weather'

interface WeatherHistoryChartProps {
  data: HistoricalWeatherResponse | null
  isLoading?: boolean
}

function ChartSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md">
      <div className="flex h-full items-center justify-center">
        <div className="h-48 w-full max-w-md rounded-lg bg-white/10" />
      </div>
    </div>
  )
}

export function WeatherHistoryChart({ data, isLoading }: WeatherHistoryChartProps) {
  const { symbol } = useUnit()

  if (isLoading) return <ChartSkeleton />

  if (!data?.hourly?.time?.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md">
        <p className="text-slate-400">No historical data available</p>
      </div>
    )
  }

  // Sample hourly data to ~24 points for readability (every 7th hour)
  const step = Math.max(1, Math.floor(data.hourly.time.length / 24))
  const chartData = data.hourly.time
    .filter((_, i) => i % step === 0)
    .map((time, i) => {
      const idx = i * step
      return {
        time: new Date(time).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
        }),
        temp: Math.round(data.hourly.temperature_2m[idx] ?? 0),
        full: time,
      }
    })

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-100">
        Weather History (Past 7 Days)
      </h2>
      <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
                itemStyle={{ color: '#38bdf8' }}
                formatter={(value: number) => [`${value} ${symbol}`, 'Temp']}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#38bdf8"
                fillOpacity={1}
                fill="url(#colorTemp)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
