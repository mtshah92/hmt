# Quick Firebase Setup Guide

## 🚀 Step-by-Step Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or select existing project
3. Enter project name (e.g., "Pratistha Quiz")
4. Continue through setup (Google Analytics optional)
5. Click **"Create project"**

### Step 2: Enable Firestore Database

1. In Firebase Console, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now)
4. Choose location (closest to your users)
5. Click **"Enable"**

### Step 3: Get Your Firebase Config

1. In Firebase Console, click the **gear icon** ⚙️ → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **web icon** `</>` to add a web app
4. Register app with nickname: **"Quiz App"**
5. **Copy the config object** that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4: Add Config to Your Project

**Create `.env.local` file** in your project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and paste your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your-actual-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 5: Set Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /quiz_progress/{userId} {
      allow read, write: if request.resource.data.userId == userId;
    }
    
    match /quiz_registrations/{userId} {
      allow read, write: if request.resource.data.userId == userId;
    }
    
    // For admin access, you can add authentication later
  }
}
```

3. Click **"Publish"**

### Step 6: Test It!

1. Restart your dev server: `pnpm dev`
2. Open the quiz page
3. Register a new user
4. Check Firebase Console → Firestore Database
5. You should see data in `quiz_progress` and `quiz_registrations` collections!

## ✅ Verification

After setup, check browser console:
- ✅ Should see: `✅ Firebase initialized successfully`
- ✅ Should see: `✅ Progress saved to Firebase`
- ✅ Should see: `✅ Registration saved to Firebase`

If you see warnings about localStorage fallback, Firebase isn't configured yet.

## 🔒 Security Rules for Production

For production, update Firestore rules to use authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quiz_progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /quiz_registrations/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎉 That's It!

Your quiz now uses Firebase! All data will be:
- ✅ Stored in Firebase (cloud)
- ✅ Backed up in localStorage (local)
- ✅ Accessible from admin dashboard
- ✅ Synced across devices

## 📊 View Data

- **Firebase Console**: https://console.firebase.google.com/
- **Admin Dashboard**: `/admin/quiz` (password: `admin2026`)

## 🆘 Troubleshooting

**"Firebase not configured" warning?**
- Check `.env.local` file exists
- Verify all environment variables are set
- Restart dev server after adding `.env.local`

**Data not appearing in Firebase?**
- Check browser console for errors
- Verify Firestore security rules allow writes
- Check Firebase Console for any error messages

**Still using localStorage?**
- Firebase config might be incorrect
- Check console for Firebase initialization errors
- Verify environment variables are prefixed with `NEXT_PUBLIC_`

