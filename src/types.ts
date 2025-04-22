export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  imageUrl: string;
  description: string;
  movement: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  period: string;
  notableWorks: string[];
}