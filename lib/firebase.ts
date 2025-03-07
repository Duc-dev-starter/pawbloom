import { config } from "@/config";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();