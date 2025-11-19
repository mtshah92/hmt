# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Follow the setup wizard
4. Enable Google Analytics (optional)

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location (choose closest to your users)
5. Click "Enable"

### Security Rules (Important!)

After setup, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for quiz_progress
    match /quiz_progress/{userId} {
      allow read, write: if request.auth != null || request.resource.data.userId == userId;
    }
    
    // Allow read/write for quiz_registrations
    match /quiz_registrations/{userId} {
      allow read, write: if request.auth != null || request.resource.data.userId == userId;
    }
    
    // For admin access, you can add:
    // match /{document=**} {
    //   allow read, write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    // }
  }
}
```

**For development/testing**, you can use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Only for development!
    }
  }
}
```

⚠️ **Warning**: The above rule allows anyone to read/write. Only use for testing!

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register app with a nickname
5. Copy the Firebase configuration object

## Step 4: Add Configuration to Your Project

### Option A: Environment Variables (Recommended)

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Option B: Direct Configuration

Edit `src/config/firebase.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 5: Install Firebase SDK

```bash
npm install firebase
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Open the quiz page
3. Register a new user
4. Check Firebase Console > Firestore Database to see if data appears

## Data Structure

### Collections Created:

1. **quiz_progress** - User quiz progress
   - Document ID: `userId`
   - Fields: `userId`, `displayName`, `totalPoints`, `currentStreak`, `completedDays`, `answers`, `badges`, etc.

2. **quiz_registrations** - User registration data
   - Document ID: `userId`
   - Fields: `userId`, `name`, `email`, `phone`, `city`, `state`, `age`, `gender`, `registeredAt`, etc.

## Troubleshooting

### Error: "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Firebase Console > Authentication > Settings > Authorized domains

### Error: "Firebase: Error (permission-denied)"
- Check Firestore security rules
- Make sure rules allow read/write operations

### Data not appearing in Firebase
- Check browser console for errors
- Verify Firebase configuration is correct
- Check network tab for failed requests

## Production Considerations

1. **Update Security Rules**: Use proper authentication-based rules
2. **Enable Authentication**: Add Firebase Authentication for better security
3. **Set up Indexes**: Create indexes for queries if needed
4. **Monitor Usage**: Check Firebase Console for usage and limits
5. **Backup Data**: Set up regular backups

## Free Tier Limits

Firebase Free (Spark) Plan:
- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1 GB storage

For most quiz applications, this is sufficient!

