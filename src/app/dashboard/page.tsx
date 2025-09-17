"use client";

import React from 'react';
import { motion, easeInOut, easeOut } from 'framer-motion';
import Link from 'next/link';
import { 
  Trophy, 
  BookOpen, 
  Play, 
  MessageCircle, 
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function DashboardPage() {
  const { user, signIn, loading } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: easeInOut
      }
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="text-xl text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Show sign-in prompt if no user
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Welcome to C++ Learning Simulator
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master C++ programming with our interactive learning platform
          </p>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              🚀 Interactive C++ Code Simulator<br/>
              🤖 AI-Powered Programming Tutor<br/>
              📚 Comprehensive Learning Modules<br/>
              🏆 Track Your Progress & Achievements
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signIn}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Welcome back, {user.displayName}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Continue your C++ learning journey
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* XP Progress Card */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Level {user.level}</h3>
              <p className="text-sm text-muted-foreground">XP Progress</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{user.xp} XP</span>
              <span>{Math.floor(user.xp / 100) * 100 + 100} XP</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {100 - (user.xp % 100)} XP to next level
            </p>
          </div>
        </motion.div>

        {/* Modules Completed Card */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {user.completedModules.length}
              </h3>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-3xl font-bold text-green-600">
              {Math.round((user.completedModules.length / 8) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">
              {8 - user.completedModules.length} modules remaining
            </p>
          </div>
        </motion.div>

        {/* Achievements Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {user.achievements.length}
              </h3>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= user.achievements.length
                      ? 'bg-yellow-500'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {3 - user.achievements.length} achievements to unlock
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary" />
            <span>Quick Actions</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/modules">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg text-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer"
              >
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold">Start Learning</h4>
                <p className="text-sm opacity-90">Explore C++ Modules</p>
              </motion.div>
            </Link>

            <Link href="/simulator">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-emerald-600 transition-all duration-300 cursor-pointer"
              >
                <Play className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold">Open Simulator</h4>
                <p className="text-sm opacity-90">Practice C++ Code</p>
              </motion.div>
            </Link>

            <Link href="/tutor">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold">Ask AI Tutor</h4>
                <p className="text-sm opacity-90">Get Help & Guidance</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
