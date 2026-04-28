import { useState, useMemo } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { CountryPhotos } from '@/types'

interface GalleryPhoto {
  src: string
  caption?: string
  countryCode: string
  countryName: string
}

function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

function displayName(name: string): string {
  if (name === 'United States of America') return 'United States'
  return name
}

interface GalleryViewProps {
  countryPhotos: CountryPhotos[]
}

export default function GalleryView({ countryPhotos }: GalleryViewProps) {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const allPhotos = useMemo<GalleryPhoto[]>(
    () =>
      countryPhotos.flatMap(c =>
        c.photos.map(p => ({
          ...p,
          countryCode: c.countryCode,
          countryName: c.countryName,
        }))
      ),
    [countryPhotos]
  )

  const filtered = useMemo(
    () =>
      activeCountry
        ? allPhotos.filter(p => p.countryCode === activeCountry)
        : allPhotos,
    [allPhotos, activeCountry]
  )

  const hasAnyPhotos = allPhotos.length > 0

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveCountry(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            activeCountry === null
              ? 'bg-[#C2410C] border-[#C2410C] text-white'
              : 'border-[#E5E5E5] dark:border-[#2a2a2a] text-[#737373] dark:text-[#a3a3a3] hover:border-[#C2410C] hover:text-[#C2410C] dark:hover:border-[#C2410C] dark:hover:text-[#C2410C]'
          }`}
        >
          All
          {allPhotos.length > 0 && (
            <span className="ml-1 opacity-60">({allPhotos.length})</span>
          )}
        </button>

        {countryPhotos.map(c => {
          const isActive = activeCountry === c.countryCode
          return (
            <button
              key={c.countryCode}
              onClick={() => setActiveCountry(isActive ? null : c.countryCode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                isActive
                  ? 'bg-[#C2410C] border-[#C2410C] text-white'
                  : 'border-[#E5E5E5] dark:border-[#2a2a2a] text-[#737373] dark:text-[#a3a3a3] hover:border-[#C2410C] hover:text-[#C2410C] dark:hover:border-[#C2410C] dark:hover:text-[#C2410C]'
              }`}
            >
              <span>{flagEmoji(c.countryCode)}</span>
              <span>{displayName(c.countryName)}</span>
              {c.photos.length > 0 && (
                <span className="opacity-60">({c.photos.length})</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Gallery */}
      {!hasAnyPhotos ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Photos coming soon.</p>
          <p className="text-xs text-[#B0B0B0] dark:text-[#555]">Check back later.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">No photos from this country yet.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {filtered.map((photo, i) => (
            <div key={`${photo.countryCode}-${i}`} className="break-inside-avoid mb-3">
              <button
                onClick={() => setLightboxIndex(i)}
                className="group w-full block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
              >
                <img
                  src={photo.src}
                  alt={photo.caption ?? `Photo from ${photo.countryName}`}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
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
