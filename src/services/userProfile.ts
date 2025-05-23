import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User } from 'firebase/auth';
import { UserProfile as UserProfileType, UserCollection as UserCollectionType } from '../types/user'; // Import types

const db = getFirestore();
const storage = getStorage();

export const createUserProfile = async (user: User): Promise<UserProfileType> => {
  const userRef = doc(db, 'users', user.uid);
  const userProfile: UserProfileType = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    bio: '',
    createdAt: Date.now(), // Use timestamp
    updatedAt: Date.now(), // Use timestamp
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    },
    favorites: [],
    collections: []
  };

  await setDoc(userRef, userProfile);
  return userProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfileType | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfileType;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfileType>) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: Date.now() // Use timestamp
  });
};

export const uploadProfilePicture = async (uid: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `profile-pictures/${uid}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  await updateUserProfile(uid, { photoURL: downloadURL });
  return downloadURL;
};

export const toggleFavorite = async (uid: string, artworkId: string) => {
  const userProfile = await getUserProfile(uid);
  if (!userProfile) return;

  const favorites = userProfile.favorites || []; // Ensure favorites is an array
  const isFavorite = favorites.includes(artworkId);
  
  const updatedFavorites = isFavorite
    ? favorites.filter(id => id !== artworkId)
    : [...favorites, artworkId];

  await updateUserProfile(uid, { favorites: updatedFavorites });
  return updatedFavorites;
};

export const getCollections = async (userId: string): Promise<UserCollectionType[]> => {
  const collectionsRef = collection(db, 'users', userId, 'collections');
  const snapshot = await getDocs(collectionsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UserCollectionType));
};

export const createCollection = async (userId: string, name: string): Promise<UserCollectionType | null> => {
  try {
    const collectionsRef = collection(db, 'users', userId, 'collections');
    const newCollectionRef = doc(collectionsRef);
    const newCollection: UserCollectionType = {
      id: newCollectionRef.id,
      name,
      artworkIds: [],
      artistIds: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await setDoc(newCollectionRef, newCollection);
    return newCollection;
  } catch (error) {
    console.error('Error creating collection:', error);
    return null;
  }
};

export const deleteCollection = async (userId: string, collectionId: string): Promise<boolean> => {
  try {
    const collectionRef = doc(db, 'users', userId, 'collections', collectionId);
    await deleteDoc(collectionRef);
    return true;
  } catch (error) {
    console.error('Error deleting collection:', error);
    return false;
  }
};

export const addArtworkToCollection = async (userId: string, collectionId: string, artworkId: string): Promise<boolean> => {
  try {
    const collectionRef = doc(db, 'users', userId, 'collections', collectionId);
    await updateDoc(collectionRef, {
      artworkIds: arrayUnion(artworkId),
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error adding artwork to collection:', error);
    return false;
  }
};

export const removeArtworkFromCollection = async (userId: string, collectionId: string, artworkId: string): Promise<boolean> => {
  try {
    const collectionRef = doc(db, 'users', userId, 'collections', collectionId);
    await updateDoc(collectionRef, {
      artworkIds: arrayRemove(artworkId),
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error removing artwork from collection:', error);
    return false;
  }
};

export const addArtistToCollection = async (userId: string, collectionId: string, artistId: string): Promise<boolean> => {
  try {
    const collectionRef = doc(db, 'users', userId, 'collections', collectionId);
    await updateDoc(collectionRef, {
      artistIds: arrayUnion(artistId),
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error adding artist to collection:', error);
    return false;
  }
};

export const removeArtistFromCollection = async (userId: string, collectionId: string, artistId: string): Promise<boolean> => {
  try {
    const collectionRef = doc(db, 'users', userId, 'collections', collectionId);
    await updateDoc(collectionRef, {
      artistIds: arrayRemove(artistId),
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error removing artist from collection:', error);
    return false;
  }
}; 