import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { artists } from '../data/artists'; // Import the artists data

// Define Firebase configuration directly for this script (same as artwork migration)
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

async function migrateArtistsToFirestore() {
  console.log('Starting migration of artists to Firestore...');

  for (const artist of artists) {
    try {
      // Use the artist.id as the document ID in Firestore
      const artistRef = doc(db, 'artists', artist.id);

      // Set the artist data. Exclude the 'link' if you don't want it in DB
      // For now, migrating all fields in the Artist type
      await setDoc(artistRef, artist);

      console.log(`Artist "${artist.name}" migrated successfully.`);
    } catch (error) {
      console.error(`Error migrating artist "${artist.name}":`, error);
    }
  }

  console.log('Artist migration completed.');
}

migrateArtistsToFirestore().catch(console.error); 