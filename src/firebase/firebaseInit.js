// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Add other Firebase services you need here, such as getStorage, getAnalytics, etc.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeFirebase() {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);

    return {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      storage: getStorage(app),
      // Add other initialized services here .............. ............... .........
    };
  } else {
    const app = getApp();
    return {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      storage: getStorage(app),
      // Add other initialized services here................ ........................
    };
  }
}

const firebase = initializeFirebase();

export default firebase;
