export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  year: number;
}

export interface Photo {
  src: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CountryPhotos {
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  photos: Photo[];
  visitNote?: string;
}

// stateName must exactly match the name in us-atlas states-10m.json
// e.g. 'California', 'New York', 'Washington'
export interface StatePhotos {
  stateName: string;
  stateCode: string;
  photos: Photo[];
  visitNote?: string;
}
