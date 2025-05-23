export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  bio?: string;
  createdAt: number;
  updatedAt: number;
  preferences?: {
    theme: string;
    language: string;
    notifications: boolean;
  };
  favorites?: string[]; // Array of artwork IDs
  collections: UserCollection[]; // Array of user-created collections
}

export interface UserCollection {
  id: string;
  name: string;
  artworkIds: string[];
  artistIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionWithDetails extends UserCollection {
  artworks: Artwork[];
  artists: Artist[];
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: string;
  year: string;
  movement: string;
  artistMotivation?: string;
  historicalContext?: string;
  artistImageUrl?: string;
  artistBio?: string;
  artistLink?: string;
}

export interface Artist {
  id: string;
  name: string;
  period: string;
  bio: string;
  imageUrl: string;
  notableWorks: string[];
  link: string;
} 