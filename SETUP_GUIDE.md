# 🚀 C++ Learning Simulator - Production Setup Guide

## Overview
Your app is now configured for **real-world users** with proper Firebase authentication. Follow this guide to set up Firebase and deploy your app.

---

## 📋 Prerequisites
- Google account
- Vercel account (for deployment)
- Your project files

---

## 🔥 Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Click "Create a project"

2. **Project Setup**
   - **Project name**: `cpp-learning-simulator` (or your preferred name)
   - **Analytics**: You can enable or disable (optional)
   - Click "Create project"

3. **Enable Authentication**
   - In Firebase console, go to **Authentication** → **Get started**
   - Go to **Sign-in method** tab
   - Enable **Google** sign-in provider
   - Add your domain (e.g., `your-app.vercel.app`) to authorized domains

4. **Enable Firestore Database**
   - Go to **Firestore Database** → **Create database**
   - Choose **Start in production mode**
   - Select your preferred location
   - Click "Done"

5. **Get Firebase Configuration**
   - Go to **Project Settings** (gear icon)
   - Scroll down to "Your apps" section
   - Click **Web app** icon (`</>`)
   - Register app name: `cpp-simulator`
   - Copy the configuration object

---

## ⚙️ Step 2: Configure Environment Variables

1. **Create `.env.local` file** in your project root (`cpp-simulator` folder):

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Keys (get these from respective services)
GEMINI_API_KEY=your_gemini_api_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
```

2. **Get API Keys**:
   - **Gemini API**: https://makersuite.google.com/app/apikey
   - **RapidAPI** (for code execution): https://rapidapi.com/judge0-official/api/judge0-ce/

---

## 🚀 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to https://vercel.com/
2. Click "New Project"
3. Import your GitHub repository
4. **Add Environment Variables**:
   - In Vercel project settings → Environment Variables
   - Add all the variables from your `.env.local` file
5. Deploy

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... add all other variables

# Redeploy with environment variables
vercel --prod
```

---

## 🔒 Step 4: Configure Firestore Security Rules

In Firebase Console → Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow read access to public data (if needed)
    match /{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

---

## ✅ Step 5: Test Your App

1. **Visit your deployed URL**
2. **Test Authentication**:
   - Click "Sign in with Google"
   - Complete Google sign-in
   - Verify user data is saved in Firestore
3. **Test Features**:
   - Complete a module
   - Check XP updates
   - Verify progress tracking

---

## 🔄 Updates & Redeployment

### Automatic Updates (Recommended)
- **Vercel automatically redeploys** when you push to your connected GitHub repository
- No manual action needed

### Manual Updates
If you need to redeploy manually:
```bash
vercel --prod
```

---

## 🛡️ Security Checklist

- ✅ Firebase security rules configured
- ✅ Environment variables set in Vercel
- ✅ Google OAuth configured with correct domains
- ✅ API keys secured (never commit to Git)
- ✅ Database access restricted to authenticated users

---

## 🆘 Troubleshooting

### Authentication Issues
- Check if your domain is added to Firebase authorized domains
- Verify environment variables are correctly set in Vercel
- Check browser console for detailed error messages

### Database Issues
- Verify Firestore rules allow authenticated users
- Check if Firebase project ID matches your environment variables

### Deployment Issues
- Ensure all environment variables are added to Vercel
- Check Vercel build logs for specific errors
- Verify API keys are valid and have proper permissions

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test Firebase configuration locally first

---

**Your app is now ready for real-world users! 🎉**

Users will sign in with their Google accounts and have their progress tracked in Firebase Firestore.
