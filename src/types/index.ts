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
}

export interface CountryPhotos {
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  photos: Photo[];
}
