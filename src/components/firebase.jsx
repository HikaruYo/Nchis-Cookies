import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Autentikasi
const firebaseConfigAuth = {
  apiKey: import.meta.env.VITE_API_KEY_AUTH,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_AUTH,
  projectId: import.meta.env.VITE_PROJECT_ID_AUTH,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_AUTH,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_AUTH,
  appId: import.meta.env.VITE_APP_ID_AUTH,
};

const authApp = initializeApp(firebaseConfigAuth, "authApp");
const auth = getAuth(authApp);
const provider = new GoogleAuthProvider();

// Firebase Produk
const firebaseConfigProduct = {
  apiKey: import.meta.env.VITE_API_KEY_PRODUCT,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_PRODUCT,
  projectId: import.meta.env.VITE_PROJECT_ID_PRODUCT,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_PRODUCT,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_PRODUCT,
  appId: import.meta.env.VITE_APP_ID_PRODUCT,
};

const productApp = initializeApp(firebaseConfigProduct, "productApp");
const db = getFirestore(productApp);
const storage = getStorage(productApp);

export { auth, provider, signInWithPopup };
export { db, storage };
