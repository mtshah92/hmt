/**
 * Firebase Configuration
 * Replace these values with your Firebase project credentials
 * 
 * Setup Instructions:
 * 1. Create Firebase project at https://console.firebase.google.com/
 * 2. Enable Firestore Database
 * 3. Get config from Project Settings > General > Your apps
 * 4. Create .env.local file with your Firebase credentials
 * 5. Copy .env.local.example to .env.local and fill in values
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Get this from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'your-api-key' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'your-project-id'
  );
};

// Initialize Firebase
let app = null;
let db = null;
let auth = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Connect to Firestore emulator in development (optional)
    // Uncomment if using Firebase emulator
    // if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    //   connectFirestoreEmulator(db, 'localhost', 8080);
    // }
    
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.warn('⚠️ Falling back to localStorage');
  }
} else {
  console.warn('⚠️ Firebase not configured. Using localStorage fallback.');
  console.info('💡 To enable Firebase:');
  console.info('   1. Create .env.local file');
  console.info('   2. Add your Firebase configuration');
  console.info('   3. See FIREBASE_SETUP_INSTRUCTIONS.md for details');
}

export { db, auth, isFirebaseConfigured };
export default app;

