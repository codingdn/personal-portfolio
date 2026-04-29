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
    visitNote: 'An incredibly diverse country — ski in the morning and surf in the afternoon. Every region feels like a different world.',
  },
  {
    countryCode: 'JP',
    countryName: 'Japan',
    lat: 36,
    lng: 138,
    photos: [],
    visitNote: 'Japan blends ancient tradition with cutting-edge modernity unlike anywhere else. The food, the culture, the precision — truly unforgettable.',
  },
  {
    countryCode: 'VN',
    countryName: 'Vietnam',
    lat: 14,
    lng: 108,
    photos: [],
    visitNote: "Vietnam's street food scene alone is worth the trip. Add in Ha Long Bay and the lantern-lit streets of Hội An and you have one of Asia's best destinations.",
  },
  {
    countryCode: 'TH',
    countryName: 'Thailand',
    lat: 15,
    lng: 101,
    photos: [],
    visitNote: 'World-class temples, turquoise beaches, and some of the friendliest people you will ever meet — all at a price that will not break the bank.',
  },
]
