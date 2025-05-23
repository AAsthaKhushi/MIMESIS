import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./config";
import { Artwork } from "../types/artwork";

const db = getFirestore(app);

export async function fetchArtworks(): Promise<Artwork[]> {
  const artworksCol = collection(db, "artworks");
  const artworkSnapshot = await getDocs(artworksCol);
  return artworkSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Artwork, 'id'>) }));
} 