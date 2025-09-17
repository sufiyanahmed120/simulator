"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { auth, googleProvider, isFirebaseConfigured, db } from '@/lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserXP: (xp: number) => Promise<void>;
  completeModule: (moduleId: string, xpReward: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert Firebase user to our User type
  const createUserFromFirebase = async (firebaseUser: FirebaseUser): Promise<User> => {
    if (!db) throw new Error('Firebase not configured');
    
    const userDoc = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userDoc);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        xp: userData.xp || 0,
        level: userData.level || 1,
        achievements: userData.achievements || [],
        completedModules: userData.completedModules || [],
        createdAt: userData.createdAt?.toDate() || new Date(),
        lastLoginAt: new Date(),
      };
    } else {
      // Create new user document
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        xp: 0,
        level: 1,
        achievements: [],
        completedModules: [],
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
      
      await setDoc(userDoc, {
        ...newUser,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      });
      
      return newUser;
    }
  };

  // Listen to authentication state changes
  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await createUserFromFirebase(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.error('Error creating user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real sign in function
  const signIn = async () => {
    if (!isFirebaseConfigured() || !auth || !googleProvider) {
      throw new Error('Firebase not configured. Please set up Firebase authentication.');
    }
    
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Real sign out function
  const signOutUser = async () => {
    if (!auth) return;
    
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Real update XP function
  const updateUserXP = async (xp: number) => {
    if (!user || !db) return;
    
    const newXP = user.xp + xp;
    const newLevel = Math.floor(newXP / 100) + 1;
    const updatedUser = { ...user, xp: newXP, level: newLevel };
    
    try {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        xp: newXP,
        level: newLevel,
        lastLoginAt: new Date(),
      });
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  // Real complete module function
  const completeModule = async (moduleId: string, xpReward: number) => {
    if (!user || !db) return;
    
    const newCompletedModules = [...user.completedModules, moduleId];
    const newXP = user.xp + xpReward;
    const newLevel = Math.floor(newXP / 100) + 1;
    const updatedUser = { 
      ...user, 
      xp: newXP, 
      level: newLevel, 
      completedModules: newCompletedModules 
    };
    
    try {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        xp: newXP,
        level: newLevel,
        completedModules: newCompletedModules,
        lastLoginAt: new Date(),
      });
      setUser(updatedUser);
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signOut: signOutUser, 
      updateUserXP, 
      completeModule 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
