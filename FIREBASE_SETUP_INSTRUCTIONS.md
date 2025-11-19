# Firebase Setup Instructions

## ✅ What's Been Done

1. **Firebase SDK Installed** - `firebase` package is now in your dependencies
2. **Firebase Configuration Created** - `src/config/firebase.js`
3. **All Storage Functions Updated** - Now use Firebase with localStorage fallback
4. **Registration System** - Integrated with Firebase
5. **Admin Dashboard** - Reads from Firebase

## 📋 Next Steps to Complete Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Follow the setup wizard
4. Enable Google Analytics (optional)

### Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location (choose closest to your users)
5. Click "Enable"

### Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register app with a nickname (e.g., "Quiz App")
5. Copy the Firebase configuration object

### Step 4: Add Configuration

**Option A: Environment Variables (Recommended)**

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Option B: Direct Configuration**

Edit `src/config/firebase.js` and replace the placeholder values with your actual Firebase config.

### Step 5: Set Firestore Security Rules

Go to Firebase Console > Firestore Database > Rules tab and use:

**For Development/Testing:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Only for testing!
    }
  }
}
```

**For Production (Recommended):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quiz progress - users can only read/write their own data
    match /quiz_progress/{userId} {
      allow read, write: if request.resource.data.userId == userId;
    }
    
    // Quiz registrations - users can only read/write their own data
    match /quiz_registrations/{userId} {
      allow read, write: if request.resource.data.userId == userId;
    }
  }
}
```

## 🔄 How It Works

### Data Flow:
1. **User Registration** → Saved to Firebase + localStorage (backup)
2. **Quiz Progress** → Saved to Firebase + localStorage (backup)
3. **Admin Dashboard** → Reads from Firebase (with localStorage fallback)

### Fallback System:
- If Firebase is not configured → Uses localStorage
- If Firebase fails → Falls back to localStorage
- Data syncs to Firebase when available

## 📊 Collections Created

Firebase will automatically create these collections:

1. **`quiz_progress`** - User quiz progress
   - Document ID: `userId`
   - Fields: `userId`, `displayName`, `totalPoints`, `currentStreak`, `completedDays`, `answers`, `badges`, etc.

2. **`quiz_registrations`** - User registration data
   - Document ID: `userId`
   - Fields: `userId`, `name`, `email`, `phone`, `city`, `state`, `age`, `gender`, `registeredAt`, etc.

## ✅ Testing

1. Start your dev server: `pnpm dev`
2. Open the quiz page
3. Register a new user
4. Check Firebase Console > Firestore Database to see if data appears

## 🎯 Benefits

- ✅ **Centralized Data** - All data in one place
- ✅ **Real-time Updates** - Admin dashboard shows live data
- ✅ **Cross-device Sync** - Users can access from any device
- ✅ **Backup** - localStorage acts as backup
- ✅ **Scalable** - Can handle thousands of users
- ✅ **Free Tier** - 50K reads/day, 20K writes/day (usually enough!)

## 🔒 Security Notes

- Change admin password in `src/app/admin/quiz/page.js`
- Update Firestore security rules for production
- Consider adding Firebase Authentication for better security

## 📝 Current Status

- ✅ Firebase SDK installed
- ✅ Code updated to use Firebase
- ⏳ **Waiting for you to**: Add Firebase configuration
- ⏳ **Waiting for you to**: Set up Firestore database
- ⏳ **Waiting for you to**: Configure security rules

Once you complete the setup steps above, everything will work with Firebase!

