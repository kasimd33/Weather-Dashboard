export function CurrentWeatherSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div className="h-8 w-32 rounded-lg bg-white/20" />
          <div className="h-16 w-24 rounded-xl bg-white/20" />
          <div className="h-5 w-40 rounded bg-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 p-3"
            >
              <div className="mb-1 h-3 w-12 rounded bg-white/20" />
              <div className="h-6 w-14 rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
