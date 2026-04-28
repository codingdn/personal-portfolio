import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { CountryPhotos } from '@/types'

interface PhotoGridProps {
  countryPhotos: CountryPhotos | null
}

export default function PhotoGrid({ countryPhotos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  if (!countryPhotos) {
    return (
      <div className="flex items-center justify-center py-20 text-center">
        <p className="text-sm text-[#737373] dark:text-[#a3a3a3] max-w-[180px]">
          Drag the globe and click an orange country to see photos.
        </p>
      </div>
    )
  }

  const { countryName, photos } = countryPhotos

  if (photos.length === 0) {
    return (
      <div>
        <h2 className="text-base font-medium text-[#111111] dark:text-[#f5f5f5] mb-4">{countryName}</h2>
        <div className="flex items-center justify-center py-16 border border-dashed border-[#E5E5E5] dark:border-[#2a2a2a] rounded-lg">
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Photos coming soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-base font-medium text-[#111111] dark:text-[#f5f5f5] mb-4">{countryName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="aspect-square overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
          >
            <img
              src={photo.src}
              alt={photo.caption ?? `Photo ${i + 1} from ${countryName}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
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
