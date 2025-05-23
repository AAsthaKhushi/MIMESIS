import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { app } from '../firebase/config'; // Removed this import
import { artworks } from '../data/artworks';

// Define Firebase configuration directly for this script
const firebaseConfig = {
  apiKey: "AIzaSyAZj5HW_FfiBLC4h_-ScZZyh5RcfPEwvPA",
  authDomain: "mimesis-fe5f8.firebaseapp.com",
  projectId: "mimesis-fe5f8",
  storageBucket: "mimesis-fe5f8.firebasestorage.app",
  messagingSenderId: "462964373825",
  appId: "1:462964373825:web:2c06456f0c8e5da0ad49c0",
  // No measurementId or analytics import needed for this script
};

// Initialize a dedicated app instance for the script
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function migrateArtworksToFirestore() {
  console.log('Starting migration of artworks to Firestore...');

  for (const artwork of artworks) {
    try {
      // Use a simpler ID for Firestore document if artwork.id is too complex
      // const docId = artwork.id.replace(/[^a-zA-Z0-9]/g, ''); // Example: remove special chars
      // const artworkRef = doc(db, 'artworks', docId);

      // Using the provided artwork.id as the document ID
      const artworkRef = doc(db, 'artworks', artwork.id);

      await setDoc(artworkRef, artwork);
      console.log(`Artwork "${artwork.title}" migrated successfully.`);
    } catch (error) {
      console.error(`Error migrating artwork "${artwork.title}":`, error);
    }
  }

  console.log('Artwork migration completed.');
}

migrateArtworksToFirestore().catch(console.error); 