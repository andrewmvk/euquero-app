import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '***REMOVED***',
  authDomain: 'euquero-app-50e1e.firebaseapp.com',
  projectId: 'euquero-app-50e1e',
  storageBucket: 'euquero-app-50e1e.appspot.com',
  messagingSenderId: '76643349812',
  appId: '1:76643349812:web:94d7fa928f00fb5f9f6161',
  measurementId: 'G-ZM8QKEDKE3',
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, 'Secondary');

export const auth = getAuth(app);
export const authSecondary = getAuth(secondaryApp);

export const storage = getStorage(app);

export const db = getFirestore(app);
