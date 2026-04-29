'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { countryPhotos } from '@/data/photography'
import { statePhotos } from '@/data/usa-photography'
import { flagEmoji, displayName } from '@/lib/photo-utils'
import { useFocusTrap } from '@/lib/use-focus-trap'

interface FlatPhoto {
  src: string
  caption?: string
  width: number
  height: number
  locationLabel: string
  subLabel?: string
  flag: string
}

function buildAllPhotos(): FlatPhoto[] {
  const fromCountries = countryPhotos.flatMap(c =>
    c.photos.map(p => ({
      src: p.src,
      caption: p.caption,
      width: p.width ?? 1200,
      height: p.height ?? 900,
      locationLabel: displayName(c.countryName),
      flag: flagEmoji(c.countryCode),
    }))
  )
  const fromStates = statePhotos.flatMap(s =>
    s.photos.map(p => ({
      src: p.src,
      caption: p.caption,
      width: p.width ?? 1200,
      height: p.height ?? 900,
      locationLabel: s.stateName,
      subLabel: 'United States',
      flag: '🇺🇸',
    }))
  )
  return [...fromCountries, ...fromStates]
}

// Computed once at module load — data is static
const ALL_PHOTOS: FlatPhoto[] = buildAllPhotos()

function ShuffleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  )
}

interface LuckyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LuckyModal({ isOpen, onClose }: LuckyModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  useFocusTrap(panelRef, isOpen)

  const pickRandom = useCallback(() => {
    if (ALL_PHOTOS.length === 0) return
    setIndex(Math.floor(Math.random() * ALL_PHOTOS.length))
  }, [])

  // Pick a new random photo each time the modal opens
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) pickRandom()
  }, [isOpen, pickRandom])

  // Move focus into the panel when it opens
  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => panelRef.current?.focus())
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'r' || e.key === 'R') pickRandom()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose, pickRandom])

  if (!isOpen) return null

  const photo = ALL_PHOTOS[index]

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lucky-title"
        tabIndex={-1}
        className="relative w-full max-w-[560px] bg-white dark:bg-[#1a1a1a] border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden animate-[palette-in_0.15s_ease-out] outline-none"
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] dark:border-[#252525]">
          <span id="lucky-title" className="text-xs font-medium text-[#737373] dark:text-[#a3a3a3]">
            I&apos;m Feeling Lucky
          </span>
          <div className="flex items-center gap-1">
            {ALL_PHOTOS.length > 1 && (
              <button
                onClick={pickRandom}
                title="Shuffle (R)"
                aria-label="Show another random photo"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#737373] dark:text-[#a3a3a3] hover:text-[#C2410C] dark:hover:text-[#C2410C] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-md transition-colors"
              >
                <ShuffleIcon />
                <span>Shuffle</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-md transition-colors"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Content */}
        {!photo ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">No photos yet.</p>
            <p className="text-xs text-[#B0B0B0] dark:text-[#555]">Add some photos to your gallery to use this feature.</p>
          </div>
        ) : (
          <>
            {/* Photo */}
            <div className="relative w-full bg-[#F5F5F5] dark:bg-[#111]" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.caption ?? photo.locationLabel}
                fill
                sizes="560px"
                className="object-cover"
                priority
              />
            </div>

            {/* Info strip */}
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg leading-none" aria-hidden="true">{photo.flag}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#111111] dark:text-[#f5f5f5] truncate">
                    {photo.caption ?? photo.locationLabel}
                  </p>
                  {photo.caption && (
                    <p className="text-xs text-[#737373] dark:text-[#a3a3a3] truncate">
                      {photo.subLabel ? `${photo.locationLabel} · ${photo.subLabel}` : photo.locationLabel}
                    </p>
                  )}
                  {!photo.caption && photo.subLabel && (
                    <p className="text-xs text-[#737373] dark:text-[#a3a3a3] truncate">{photo.subLabel}</p>
                  )}
                </div>
              </div>
              {ALL_PHOTOS.length > 1 && (
                <span className="text-[11px] text-[#B0B0B0] dark:text-[#555] shrink-0 font-mono" aria-live="polite">
                  {index + 1} / {ALL_PHOTOS.length}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
