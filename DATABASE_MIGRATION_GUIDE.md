# Database Migration Guide

## Current Setup (localStorage)

Currently, the quiz system uses **localStorage** which stores data in the user's browser. This means:
- ✅ Works offline
- ✅ No backend needed
- ✅ Fast and simple
- ❌ Data is browser-specific (lost if user clears browser data)
- ❌ No centralized data collection
- ❌ Limited to single device

## Database Options

### Option 1: Firebase (Recommended for Quick Setup)

**Pros:**
- Free tier available
- Real-time database
- Easy authentication
- No backend code needed

**Setup:**
1. Create Firebase project at https://firebase.google.com
2. Enable Firestore Database
3. Install: `npm install firebase`
4. Replace localStorage calls with Firestore

**Example Migration:**
```javascript
// Instead of localStorage
localStorage.setItem('quiz_progress_123', data);

// Use Firestore
await db.collection('quiz_progress').doc('123').set(data);
```

### Option 2: Supabase (PostgreSQL)

**Pros:**
- Free tier
- Real PostgreSQL database
- Built-in authentication
- REST API auto-generated

**Setup:**
1. Create project at https://supabase.com
2. Create tables matching current data structure
3. Install: `npm install @supabase/supabase-js`

### Option 3: Custom Backend (Node.js + MongoDB/PostgreSQL)

**Pros:**
- Full control
- Custom business logic
- Better for large scale

**Cons:**
- Requires backend development
- Server hosting needed

## Data Structure to Migrate

### 1. User Progress
```javascript
{
  userId: string,
  displayName: string,
  totalPoints: number,
  currentStreak: number,
  longestStreak: number,
  completedDays: number[],
  answers: {
    "day-1-q-1": {
      correct: boolean,
      points: number,
      selectedIndex: number,
      timestamp: string
    }
  },
  badges: string[],
  createdAt: string,
  lastActive: string
}
```

### 2. User Registration
```javascript
{
  userId: string,
  name: string,
  email: string,
  phone: string,
  city: string,
  state: string,
  age: number,
  gender: string,
  registeredAt: string,
  isRegistered: boolean
}
```

## Migration Steps

1. **Create Database Tables/Collections**
   - `users` - User registration data
   - `quiz_progress` - User quiz progress
   - `quiz_answers` - Individual answers (optional, can be nested)

2. **Create API Endpoints**
   - `POST /api/users/register` - Register new user
   - `GET /api/users/:id/progress` - Get user progress
   - `PUT /api/users/:id/progress` - Update progress
   - `GET /api/admin/statistics` - Get admin statistics

3. **Update Frontend Code**
   - Replace `localStorage` calls with API calls
   - Add loading states
   - Handle errors

4. **Data Migration Script**
   - Export existing localStorage data
   - Import to new database

## Quick Firebase Example

```javascript
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// quizStorage.js (updated)
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveUserProgress = async (progress) => {
  await setDoc(doc(db, 'quiz_progress', progress.userId), progress);
};

export const getUserProgress = async (userId) => {
  const docRef = doc(db, 'quiz_progress', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
```

## Recommendation

For this project, I recommend **Firebase** because:
1. Quick to set up (30 minutes)
2. Free tier is generous
3. Real-time updates for admin dashboard
4. No backend code needed
5. Easy to migrate from localStorage

Would you like me to implement Firebase integration?

