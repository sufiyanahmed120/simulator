"use client";

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types';

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
  const [loading] = useState(false); // Set to false immediately since we're not loading anything

  // Mock sign in function
  const signIn = async () => {
    console.warn('Firebase not configured. Running in demo mode.');
    // Create a mock user for demo purposes
    const mockUser: User = {
      uid: 'demo-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: undefined,
      xp: 0,
      level: 1,
      achievements: [],
      completedModules: [],
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    setUser(mockUser);
  };

  // Mock sign out function
  const signOutUser = async () => {
    console.warn('Firebase not configured. Running in demo mode.');
    setUser(null);
  };

  // Mock update XP function
  const updateUserXP = async (xp: number) => {
    if (!user) return;
    const newXP = user.xp + xp;
    const newLevel = Math.floor(newXP / 100) + 1;
    const updatedUser = { ...user, xp: newXP, level: newLevel };
    setUser(updatedUser);
  };

  // Mock complete module function
  const completeModule = async (moduleId: string, xpReward: number) => {
    if (!user) return;
    const newCompletedModules = [...user.completedModules, moduleId];
    const newXP = user.xp + xpReward;
    const newLevel = Math.floor(newXP / 100) + 1;
    const updatedUser = { 
      ...user, 
      xp: newXP, 
      level: newLevel, 
      completedModules: newCompletedModules 
    };
    setUser(updatedUser);
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
