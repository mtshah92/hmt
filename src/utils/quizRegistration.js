/**
 * User Registration Utilities
 * Manages user registration and profile information
 * Uses Firebase Firestore with localStorage fallback
 */

import { getOrCreateUserId } from './quizStorage';
import { saveUserRegistration, getUserRegistration as getRegFromFirebase, getAllRegistrations as getAllRegFromFirebase } from './firebaseStorage';
import { getUserProgress, saveUserProgress } from './quizStorage';

export const registerUser = async (userData) => {
  if (typeof window === 'undefined') return null;
  
  const {
    name,
    email,
    phone,
    city,
    state,
    age,
    gender
  } = userData;
  
  // Get or create user ID
  const userId = getOrCreateUserId();
  if (!userId) return null;
  
  // Create registration data
  const registration = {
    userId: userId,
    name: name || 'Anonymous',
    email: email || null,
    phone: phone || null,
    city: city || null,
    state: state || null,
    age: age || null,
    gender: gender || null,
    registeredAt: new Date().toISOString(),
    isRegistered: true
  };
  
  // Save registration to Firebase (with localStorage fallback)
  await saveUserRegistration(registration);
  
  // Also save to localStorage as backup
  const regKey = `quiz_registration_${userId}`;
  localStorage.setItem(regKey, JSON.stringify(registration));
  
  // Update progress with display name
  const progress = await getUserProgress();
  if (progress) {
    progress.displayName = name || 'Anonymous';
    await saveUserProgress(progress);
  }
  
  return registration;
};

export const getUserRegistration = async () => {
  if (typeof window === 'undefined') return null;
  
  const userId = getOrCreateUserId();
  if (!userId) return null;
  
  // Try Firebase first
  let registration = await getRegFromFirebase(userId);
  
  if (!registration) {
    // Check localStorage as fallback
    const regKey = `quiz_registration_${userId}`;
    const stored = localStorage.getItem(regKey);
    if (stored) {
      registration = JSON.parse(stored);
      // Sync to Firebase if available
      if (registration) {
        await saveUserRegistration(registration);
      }
    }
  }
  
  return registration;
};

export const isUserRegistered = async () => {
  const registration = await getUserRegistration();
  return registration !== null && registration.isRegistered === true;
};

export const getAllRegistrations = async () => {
  // Try Firebase first
  let registrations = await getAllRegFromFirebase();
  
  // If Firebase returns empty, check localStorage
  if (registrations.length === 0 && typeof window !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('quiz_registration_')) {
        try {
          const regData = JSON.parse(localStorage.getItem(key));
          if (regData && regData.userId) {
            registrations.push(regData);
          }
        } catch (e) {
          console.error('Error parsing registration data:', e);
        }
      }
    }
  }
  
  return registrations;
};

export const updateUserProfile = async (updates) => {
  if (typeof window === 'undefined') return null;
  
  const userId = getOrCreateUserId();
  if (!userId) return null;
  
  const registration = await getUserRegistration();
  if (registration) {
    const updated = { ...registration, ...updates };
    await saveUserRegistration(updated);
    
    // Also update localStorage
    const regKey = `quiz_registration_${userId}`;
    localStorage.setItem(regKey, JSON.stringify(updated));
    
    return updated;
  }
  
  return null;
};

