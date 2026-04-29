'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { CountryPhotos, StatePhotos } from '@/types'
import { countryPhotos } from '@/data/photography'
import { statePhotos } from '@/data/usa-photography'
import { flagEmoji, displayName } from '@/lib/photo-utils'
import PhotoGrid from '@/components/PhotoGrid'
import GalleryView from '@/components/GalleryView'
import USMap from '@/components/USMap'

// Globe uses Three.js which accesses browser globals at module load time — must be client-only
const Globe = dynamic(() => import('@/components/Globe'), { ssr: false })

type Mode = 'globe' | 'usa' | 'gallery'

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
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

const modeIcons: Record<Mode, React.ReactNode> = {
  globe: <GlobeIcon />,
  usa: <MapIcon />,
  gallery: <GridIcon />,
}

const modeHints: Partial<Record<Mode, string>> = {
  globe: 'Drag to rotate — click an orange country to explore.',
  usa: 'Click an orange state to explore.',
}

export default function Photography() {
  const [mode, setMode] = useState<Mode>('globe')
  const [selectedCountry, setSelectedCountry] = useState<CountryPhotos | null>(null)
  const [selectedState, setSelectedState] = useState<StatePhotos | null>(null)
  const [flyToTarget, setFlyToTarget] = useState<{ lat: number; lng: number } | null>(null)

  const handleCountryPillClick = useCallback((country: CountryPhotos) => {
    setFlyToTarget({ lat: country.lat, lng: country.lng })
    setSelectedCountry(prev =>
      prev?.countryCode === country.countryCode ? null : country
    )
  }, [])

  return (
    <div className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-medium text-[#111111] dark:text-[#f5f5f5]">Photography</h1>
            <p className="mt-1.5 text-sm text-[#737373] dark:text-[#a3a3a3]">
              Places I&apos;ve been. Photos I&apos;ve taken.{' '}
              {modeHints[mode] && (
                <span className="text-[#B0B0B0] dark:text-[#555]">{modeHints[mode]}</span>
              )}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-0.5 border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-lg p-0.5 shrink-0" role="group" aria-label="View mode">
            {(['globe', 'usa', 'gallery'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all capitalize ${
                  mode === m
                    ? 'bg-[#111111] dark:bg-[#f5f5f5] text-white dark:text-[#111111] font-medium'
                    : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5]'
                }`}
              >
                {modeIcons[m]}
                {m === 'usa' ? 'USA' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Globe mode */}
        {mode === 'globe' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <Globe
                countryPhotos={countryPhotos}
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}
                flyToTarget={flyToTarget}
              />
              <div className="flex flex-wrap gap-2">
                {countryPhotos.map(country => {
                  const isActive = selectedCountry?.countryCode === country.countryCode
                  return (
                    <button
                      key={country.countryCode}
                      onClick={() => handleCountryPillClick(country)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        isActive
                          ? 'bg-[#C2410C] border-[#C2410C] text-white'
                          : 'border-[#E5E5E5] dark:border-[#2a2a2a] text-[#737373] dark:text-[#a3a3a3] hover:border-[#C2410C] hover:text-[#C2410C] dark:hover:border-[#C2410C] dark:hover:text-[#C2410C]'
                      }`}
                    >
                      <span aria-hidden="true">{flagEmoji(country.countryCode)}</span>
                      <span>{displayName(country.countryName)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <PhotoGrid
                location={selectedCountry ? { displayName: displayName(selectedCountry.countryName), photos: selectedCountry.photos } : null}
                emptyHint="Drag the globe and click an orange country to see photos."
              />
            </div>
          </div>
        )}

        {/* USA mode */}
        {mode === 'usa' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <USMap
                statePhotos={statePhotos}
                selectedState={selectedState}
                onStateSelect={setSelectedState}
              />
              <div className="flex flex-wrap gap-2">
                {statePhotos.map(state => {
                  const isActive = selectedState?.stateCode === state.stateCode
                  return (
                    <button
                      key={state.stateCode}
                      onClick={() => setSelectedState(prev => prev?.stateCode === state.stateCode ? null : state)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        isActive
                          ? 'bg-[#C2410C] border-[#C2410C] text-white'
                          : 'border-[#E5E5E5] dark:border-[#2a2a2a] text-[#737373] dark:text-[#a3a3a3] hover:border-[#C2410C] hover:text-[#C2410C] dark:hover:border-[#C2410C] dark:hover:text-[#C2410C]'
                      }`}
                    >
                      <span className="font-mono text-[10px]">{state.stateCode}</span>
                      <span>{state.stateName}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <PhotoGrid
                location={selectedState ? { displayName: selectedState.stateName, photos: selectedState.photos } : null}
                emptyHint="Click an orange state to see photos."
              />
            </div>
          </div>
        )}

        {/* Gallery mode */}
        {mode === 'gallery' && (
          <GalleryView countryPhotos={countryPhotos} statePhotos={statePhotos} />
        )}
      </div>
    </div>
  )
}
