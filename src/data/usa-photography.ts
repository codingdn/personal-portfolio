import type { StatePhotos } from '@/types'

// stateName must exactly match the name in us-atlas (states-10m.json).
// Full list: Alabama, Alaska, Arizona, Arkansas, California, Colorado,
// Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana,
// Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan,
// Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire,
// New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio,
// Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota,
// Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,
// Wisconsin, Wyoming
export const statePhotos: StatePhotos[] = [
  {
    stateName: 'California',
    stateCode: 'CA',
    photos: [],
    visitNote: 'Ski in the morning, surf in the afternoon. The scale and diversity of California — from Big Sur to Joshua Tree — is unlike any other state.',
  },
  {
    stateName: 'New York',
    stateCode: 'NY',
    photos: [],
    visitNote: 'New York City is one of the most electric places on earth. The energy, the food, the culture — even repeat visitors always find something new.',
  },
  {
    stateName: 'Texas',
    stateCode: 'TX',
    photos: [],
    visitNote: 'Texas has an identity entirely its own — big skies, legendary BBQ, and a mix of sprawling cities and wide-open landscapes that surprises most first-time visitors.',
  },
]
