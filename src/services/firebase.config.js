import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { REACT_APP_FIREBASE_KEY } from '@env';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: 'euquero-app-50e1e.firebaseapp.com',
  projectId: 'euquero-app-50e1e',
  storageBucket: 'euquero-app-50e1e.appspot.com',
  messagingSenderId: '76643349812',
  appId: '1:76643349812:web:94d7fa928f00fb5f9f6161',
  measurementId: 'G-ZM8QKEDKE3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
