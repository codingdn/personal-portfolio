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
  // Provide width/height for next/image optimization.
  // With Cloudinary: include them in the URL (w_1200,h_900) and set these to match.
  width?: number;
  height?: number;
}

export interface CountryPhotos {
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  photos: Photo[];
}

// stateName must exactly match the name in us-atlas states-10m.json
// e.g. 'California', 'New York', 'Washington'
export interface StatePhotos {
  stateName: string;
  stateCode: string;
  photos: Photo[];
}
