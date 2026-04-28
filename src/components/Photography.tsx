import { useState } from 'react'
import type { CountryPhotos } from '@/types'
import { countryPhotos } from '@/data/photography'
import Globe from '@/components/Globe'
import PhotoGrid from '@/components/PhotoGrid'
import GalleryView from '@/components/GalleryView'

type Mode = 'globe' | 'gallery'

function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

function displayName(name: string): string {
  if (name === 'United States of America') return 'United States'
  return name
}

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}

export default function Photography() {
  const [mode, setMode] = useState<Mode>('globe')
  const [selectedCountry, setSelectedCountry] = useState<CountryPhotos | null>(null)
  const [flyToTarget, setFlyToTarget] = useState<{ lat: number; lng: number } | null>(null)

  function handleLegendClick(country: CountryPhotos) {
    setFlyToTarget({ lat: country.lat, lng: country.lng })
    setSelectedCountry(prev =>
      prev?.countryCode === country.countryCode ? null : country
    )
  }

  return (
    <div className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-medium text-[#111111] dark:text-[#f5f5f5]">Photography</h1>
            <p className="mt-1.5 text-sm text-[#737373] dark:text-[#a3a3a3]">
              Places I've been. Photos I've taken.{' '}
              {mode === 'globe' && (
                <span className="text-[#B0B0B0] dark:text-[#555]">
                  Drag to rotate — click an orange country to explore.
                </span>
              )}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-0.5 border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-lg p-0.5 shrink-0">
            {(['globe', 'gallery'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all capitalize ${
                  mode === m
                    ? 'bg-[#111111] dark:bg-[#f5f5f5] text-white dark:text-[#111111] font-medium'
                    : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5]'
                }`}
              >
                {m === 'globe' ? <GlobeIcon /> : <GridIcon />}
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Globe mode */}
        {mode === 'globe' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            <div className="w-full lg:w-1/2 flex gap-3 items-start">
              <div className="flex-1 min-w-0">
                <Globe
                  countryPhotos={countryPhotos}
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                  flyToTarget={flyToTarget}
                />
              </div>
              <div className="flex flex-col gap-0.5 pt-2 shrink-0">
                {countryPhotos.map(country => (
                  <button
                    key={country.countryCode}
                    onClick={() => handleLegendClick(country)}
                    className={`flex items-center gap-2 text-left text-sm px-2 py-1.5 rounded-md transition-colors ${
                      selectedCountry?.countryCode === country.countryCode
                        ? 'text-[#C2410C] font-medium'
                        : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-opacity ${
                        selectedCountry?.countryCode === country.countryCode
                          ? 'bg-[#C2410C]'
                          : 'bg-[#C2410C]/60'
                      }`}
                    />
                    <span className="mr-0.5">{flagEmoji(country.countryCode)}</span>
                    {displayName(country.countryName)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <PhotoGrid countryPhotos={selectedCountry} />
            </div>
          </div>
        )}

        {/* Gallery mode */}
        {mode === 'gallery' && (
          <GalleryView countryPhotos={countryPhotos} />
        )}
      </div>
    </div>
  )
}
