/**
 * Firebase Storage Utilities
 * Handles all database operations using Firestore
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

// Check if Firebase is available
const isFirebaseAvailable = () => {
  return typeof window !== 'undefined' && db !== null && db !== undefined && isFirebaseConfigured();
};

// Fallback to localStorage if Firebase is not available
const getLocalStorageFallback = (key) => {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setLocalStorageFallback = (key, value) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

// User Progress Functions
export const saveUserProgress = async (progress) => {
  if (!progress || !progress.userId) return;
  
  if (isFirebaseAvailable()) {
    try {
      const progressRef = doc(db, 'quiz_progress', progress.userId);
      // Convert timestamps and prepare data for Firestore
      const firestoreData = {
        ...progress,
        lastActive: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdAt: progress.createdAt ? Timestamp.fromDate(new Date(progress.createdAt)) : serverTimestamp()
      };
      
      await setDoc(progressRef, firestoreData, { merge: true });
      console.log('✅ Progress saved to Firebase:', progress.userId);
      return true;
    } catch (error) {
      console.error('❌ Error saving progress to Firebase:', error);
      // Fallback to localStorage
      setLocalStorageFallback(`quiz_progress_${progress.userId}`, progress);
      return false;
    }
  } else {
    // Fallback to localStorage
    setLocalStorageFallback(`quiz_progress_${progress.userId}`, progress);
    return false;
  }
};

export const getUserProgress = async (userId) => {
  if (!userId) return null;
  
  if (isFirebaseAvailable()) {
    try {
      const progressRef = doc(db, 'quiz_progress', userId);
      const docSnap = await getDoc(progressRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore timestamps to ISO strings
        if (data.createdAt && data.createdAt.toDate) {
          data.createdAt = data.createdAt.toDate().toISOString();
        }
        if (data.lastActive && data.lastActive.toDate) {
          data.lastActive = data.lastActive.toDate().toISOString();
        }
        if (data.updatedAt && data.updatedAt.toDate) {
          data.updatedAt = data.updatedAt.toDate().toISOString();
        }
        return data;
      }
      
      // Check localStorage as fallback
      return getLocalStorageFallback(`quiz_progress_${userId}`);
    } catch (error) {
      console.error('❌ Error getting progress from Firebase:', error);
      return getLocalStorageFallback(`quiz_progress_${userId}`);
    }
  } else {
    return getLocalStorageFallback(`quiz_progress_${userId}`);
  }
};

export const getAllUsersProgress = async () => {
  if (isFirebaseAvailable()) {
    try {
      const progressCollection = collection(db, 'quiz_progress');
      const querySnapshot = await getDocs(progressCollection);
      const users = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore timestamps to ISO strings
        if (data.createdAt && data.createdAt.toDate) {
          data.createdAt = data.createdAt.toDate().toISOString();
        }
        if (data.lastActive && data.lastActive.toDate) {
          data.lastActive = data.lastActive.toDate().toISOString();
        }
        users.push(data);
      });
      
      console.log(`✅ Loaded ${users.length} users from Firebase`);
      return users;
    } catch (error) {
      console.error('❌ Error getting all users from Firebase:', error);
      return [];
    }
  } else {
    // Fallback: scan localStorage
    const users = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz_progress_')) {
          const data = getLocalStorageFallback(key);
          if (data) users.push(data);
        }
      }
    }
    return users;
  }
};

// User Registration Functions
export const saveUserRegistration = async (registration) => {
  if (!registration || !registration.userId) return;
  
  if (isFirebaseAvailable()) {
    try {
      const regRef = doc(db, 'quiz_registrations', registration.userId);
      const firestoreData = {
        ...registration,
        registeredAt: registration.registeredAt 
          ? Timestamp.fromDate(new Date(registration.registeredAt))
          : serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(regRef, firestoreData, { merge: true });
      console.log('✅ Registration saved to Firebase:', registration.userId);
      return true;
    } catch (error) {
      console.error('❌ Error saving registration to Firebase:', error);
      // Fallback to localStorage
      setLocalStorageFallback(`quiz_registration_${registration.userId}`, registration);
      return false;
    }
  } else {
    // Fallback to localStorage
    setLocalStorageFallback(`quiz_registration_${registration.userId}`, registration);
    return false;
  }
};

export const getUserRegistration = async (userId) => {
  if (!userId) return null;
  
  if (isFirebaseAvailable()) {
    try {
      const regRef = doc(db, 'quiz_registrations', userId);
      const docSnap = await getDoc(regRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore timestamps to ISO strings
        if (data.registeredAt && data.registeredAt.toDate) {
          data.registeredAt = data.registeredAt.toDate().toISOString();
        }
        if (data.updatedAt && data.updatedAt.toDate) {
          data.updatedAt = data.updatedAt.toDate().toISOString();
        }
        return data;
      }
      
      // Check localStorage as fallback
      return getLocalStorageFallback(`quiz_registration_${userId}`);
    } catch (error) {
      console.error('❌ Error getting registration from Firebase:', error);
      return getLocalStorageFallback(`quiz_registration_${userId}`);
    }
  } else {
    return getLocalStorageFallback(`quiz_registration_${userId}`);
  }
};

export const getAllRegistrations = async () => {
  if (isFirebaseAvailable()) {
    try {
      const regCollection = collection(db, 'quiz_registrations');
      const querySnapshot = await getDocs(regCollection);
      const registrations = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore timestamps to ISO strings
        if (data.registeredAt && data.registeredAt.toDate) {
          data.registeredAt = data.registeredAt.toDate().toISOString();
        }
        if (data.updatedAt && data.updatedAt.toDate) {
          data.updatedAt = data.updatedAt.toDate().toISOString();
        }
        registrations.push(data);
      });
      
      console.log(`✅ Loaded ${registrations.length} registrations from Firebase`);
      return registrations;
    } catch (error) {
      console.error('❌ Error getting all registrations from Firebase:', error);
      return [];
    }
  } else {
    // Fallback: scan localStorage
    const registrations = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz_registration_')) {
          const data = getLocalStorageFallback(key);
          if (data) registrations.push(data);
        }
      }
    }
    return registrations;
  }
};

