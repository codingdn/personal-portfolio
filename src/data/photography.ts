import type { CountryPhotos } from '@/types'

// Country names must exactly match world-atlas countries-110m.json.
// Reference names: "United States of America", "United Kingdom", "South Korea", "Vietnam"
// Add your visited countries here and place photos in public/photos/{countryCode}/
export const countryPhotos: CountryPhotos[] = [
  {
    countryCode: 'US',
    countryName: 'United States of America',
    lat: 38,
    lng: -97,
    photos: [],
  },
  {
    countryCode: 'JP',
    countryName: 'Japan',
    lat: 36,
    lng: 138,
    photos: [],
  },
  {
    countryCode: 'VN',
    countryName: 'Vietnam',
    lat: 14,
    lng: 108,
    photos: [],
  },
  {
    countryCode: 'TH',
    countryName: 'Thailand',
    lat: 15,
    lng: 101,
    photos: [],
  },
]
