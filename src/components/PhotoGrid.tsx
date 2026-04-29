'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Photo } from '@/types'

interface PhotoGridProps {
  location: { displayName: string; photos: Photo[] } | null
  emptyHint?: string
}

export default function PhotoGrid({ location, emptyHint }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  if (!location) {
    return (
      <div className="flex items-center justify-center py-20 text-center">
        <p className="text-sm text-[#737373] dark:text-[#a3a3a3] max-w-[200px]">
          {emptyHint ?? 'Select a location to see photos.'}
        </p>
      </div>
    )
  }

  const { displayName, photos } = location

  if (photos.length === 0) {
    return (
      <div>
        <h2 className="text-base font-medium text-[#111111] dark:text-[#f5f5f5] mb-4">{displayName}</h2>
        <div className="flex items-center justify-center py-16 border border-dashed border-[#E5E5E5] dark:border-[#2a2a2a] rounded-lg">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Photos coming soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-base font-medium text-[#111111] dark:text-[#f5f5f5] mb-4">{displayName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? `Photo ${i + 1} from ${displayName}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover motion-safe:hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={photos.map(p => ({ src: p.src }))}
      />
    </div>
  )
}
