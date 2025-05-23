import { initializeApp } from "firebase/app";
// Only import getAnalytics if running in browser
import { getAnalytics } from "firebase/analytics";
type MaybeWindow = typeof globalThis & { window?: any };

const firebaseConfig = {
  apiKey: "AIzaSyAZj5HW_FfiBLC4h_-ScZZyh5RcfPEwvPA",
  authDomain: "mimesis-fe5f8.firebaseapp.com",
  projectId: "mimesis-fe5f8",
  storageBucket: "mimesis-fe5f8.firebasestorage.app",
  messagingSenderId: "462964373825",
  appId: "1:462964373825:web:2c06456f0c8e5da0ad49c0",
  measurementId: "G-JFGNQ3TD4S"
};

export const app = initializeApp(firebaseConfig);
// Check if window is defined before initializing analytics (browser environment)
export const analytics = (typeof window !== "undefined") ? getAnalytics(app) : undefined; 