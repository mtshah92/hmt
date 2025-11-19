"use client";
import { useEffect, useState } from 'react';
import { isFirebaseConfigured, db } from '../config/firebase';

const FirebaseStatus = () => {
  const [status, setStatus] = useState('checking');
  const [userCount, setUserCount] = useState(0);
  const [regCount, setRegCount] = useState(0);

  useEffect(() => {
    const checkFirebase = async () => {
      if (!isFirebaseConfigured()) {
        setStatus('not-configured');
        return;
      }

      if (!db) {
        setStatus('error');
        return;
      }

      try {
        // Test connection by trying to read collections
        const { collection, getDocs } = await import('firebase/firestore');
        const progressSnapshot = await getDocs(collection(db, 'quiz_progress'));
        const regSnapshot = await getDocs(collection(db, 'quiz_registrations'));
        
        setUserCount(progressSnapshot.size);
        setRegCount(regSnapshot.size);
        setStatus('connected');
      } catch (error) {
        console.error('Firebase connection test error:', error);
        setStatus('error');
      }
    };

    checkFirebase();
  }, []);

  if (status === 'checking') {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-100 border-2 border-blue-300 rounded-lg p-3 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-sm font-semibold text-blue-800">Checking Firebase...</span>
        </div>
      </div>
    );
  }

  if (status === 'not-configured') {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 shadow-lg z-50 max-w-sm">
        <div className="flex items-start gap-2">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-yellow-800">Firebase Not Configured</p>
            <p className="text-xs text-yellow-700 mt-1">
              Using localStorage. See QUICK_FIREBASE_SETUP.md to enable Firebase.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border-2 border-red-300 rounded-lg p-3 shadow-lg z-50 max-w-sm">
        <div className="flex items-start gap-2">
          <span className="text-xl">❌</span>
          <div>
            <p className="text-sm font-semibold text-red-800">Firebase Connection Error</p>
            <p className="text-xs text-red-700 mt-1">
              Check your Firebase configuration and security rules.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border-2 border-green-300 rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <span className="text-xl">✅</span>
        <div>
          <p className="text-sm font-semibold text-green-800">Firebase Connected</p>
          <p className="text-xs text-green-700">
            {userCount} users, {regCount} registrations
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseStatus;

