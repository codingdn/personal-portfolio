'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { CountryPhotos, StatePhotos } from '@/types'
import { flagEmoji, displayName } from '@/lib/photo-utils'

interface GalleryPhoto {
  src: string
  caption?: string
  width?: number
  height?: number
  countryCode: string
  countryName: string
  stateCode?: string
  stateName?: string
}

interface GalleryViewProps {
  countryPhotos: CountryPhotos[]
  statePhotos?: StatePhotos[]
}

export default function GalleryView({ countryPhotos, statePhotos = [] }: GalleryViewProps) {
  const [activeCountries, setActiveCountries] = useState<Set<string>>(new Set())
  const [activeStates, setActiveStates] = useState<Set<string>>(new Set())
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const allPhotos = useMemo<GalleryPhoto[]>(() => {
    const fromCountries = countryPhotos.flatMap(c =>
      c.photos.map(p => ({ ...p, countryCode: c.countryCode, countryName: c.countryName }))
    )
    const fromStates = statePhotos.flatMap(s =>
      s.photos.map(p => ({
        ...p,
        countryCode: 'US',
        countryName: 'United States of America',
        stateCode: s.stateCode,
        stateName: s.stateName,
      }))
    )
    return [...fromCountries, ...fromStates]
  }, [countryPhotos, statePhotos])

  const countByCode = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of allPhotos) {
      map.set(p.countryCode, (map.get(p.countryCode) ?? 0) + 1)
      if (p.stateCode) map.set(p.stateCode, (map.get(p.stateCode) ?? 0) + 1)
    }
    return map
  }, [allPhotos])

  const filtered = useMemo(() => {
    return allPhotos.filter(p => {
      if (activeCountries.size > 0 && !activeCountries.has(p.countryCode)) return false
      // When state sub-filters are active, only show US photos matching a selected state
      if (p.countryCode === 'US' && activeStates.size > 0) {
        if (!p.stateCode || !activeStates.has(p.stateCode)) return false
      }
      return true
    })
  }, [allPhotos, activeCountries, activeStates])

  const toggleCountry = useCallback((code: string) => {
    setActiveCountries(prev => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
    // Clear state sub-filter when deselecting US
    if (code === 'US' && activeCountries.has(code)) {
      setActiveStates(new Set())
    }
  }, [activeCountries])

  const clearAll = useCallback(() => {
    setActiveCountries(new Set())
    setActiveStates(new Set())
  }, [])

  const toggleState = useCallback((code: string) => {
    setActiveStates(prev => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }, [])

  const showStateFilter = activeCountries.has('US') && statePhotos.length > 0
  const hasAnyPhotos = allPhotos.length > 0

  const pillBase = 'text-xs font-medium border transition-colors rounded-full'
  const pillActive = 'bg-[#C2410C] border-[#C2410C] text-white'
  const pillInactive = 'border-[#E5E5E5] dark:border-[#2a2a2a] text-[#737373] dark:text-[#a3a3a3] hover:border-[#C2410C] hover:text-[#C2410C] dark:hover:border-[#C2410C] dark:hover:text-[#C2410C]'

  return (
    <div>
      {/* Filter section */}
      <div className="mb-6 space-y-3">
        {/* Country row */}
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by country">
          <button
            onClick={clearAll}
            aria-pressed={activeCountries.size === 0}
            className={`px-3 py-1 ${pillBase} ${activeCountries.size === 0 ? pillActive : pillInactive}`}
          >
            All
            {allPhotos.length > 0 && <span className="ml-1 opacity-60">({allPhotos.length})</span>}
          </button>

          {countryPhotos.map(c => {
            const isActive = activeCountries.has(c.countryCode)
            const count = countByCode.get(c.countryCode) ?? 0
            return (
              <button
                key={c.countryCode}
                onClick={() => toggleCountry(c.countryCode)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 px-3 py-1 ${pillBase} ${isActive ? pillActive : pillInactive}`}
              >
                <span aria-hidden="true">{flagEmoji(c.countryCode)}</span>
                <span>{displayName(c.countryName)}</span>
                {count > 0 && <span className="opacity-60">({count})</span>}
              </button>
            )
          })}
        </div>

        {/* State sub-filter — shown when USA is among active countries */}
        {showStateFilter && (
          <div className="flex items-center gap-2 flex-wrap pl-4 border-l-2 border-[#C2410C]/30" role="group" aria-label="Filter by state">
            <button
              onClick={() => setActiveStates(new Set())}
              aria-pressed={activeStates.size === 0}
              className={`px-3 py-1 ${pillBase} ${activeStates.size === 0 ? pillActive : pillInactive}`}
            >
              All States
              {(countByCode.get('US') ?? 0) > 0 && (
                <span className="ml-1 opacity-60">({countByCode.get('US')})</span>
              )}
            </button>

            {statePhotos.map(s => {
              const isActive = activeStates.has(s.stateCode)
              const count = countByCode.get(s.stateCode) ?? 0
              return (
                <button
                  key={s.stateCode}
                  onClick={() => toggleState(s.stateCode)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 px-3 py-1 ${pillBase} ${isActive ? pillActive : pillInactive}`}
                >
                  <span className="font-mono text-[10px]">{s.stateCode}</span>
                  <span>{s.stateName}</span>
                  {count > 0 && <span className="opacity-60">({count})</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Gallery */}
      {!hasAnyPhotos ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Photos coming soon.</p>
          <p className="text-xs text-[#B0B0B0] dark:text-[#555]">Check back later.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">No photos yet.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {filtered.map((photo, i) => (
            <div key={`${photo.countryCode}-${photo.stateCode ?? ''}-${i}`} className="break-inside-avoid mb-3">
              <button
                onClick={() => setLightboxIndex(i)}
                aria-label={photo.caption ?? `Photo from ${photo.stateName ?? photo.countryName}`}
                className="group w-full block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption ?? `Photo from ${photo.stateName ?? photo.countryName}`}
                  width={photo.width ?? 1200}
                  height={photo.height ?? 900}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-500"
                />
              </button>
              {photo.caption && (
                <p className="mt-1.5 px-0.5 text-[11px] text-[#B0B0B0] dark:text-[#555] truncate">
                  {photo.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filtered.map(p => ({ src: p.src, alt: p.caption }))}
      />
    </div>
  )
}
