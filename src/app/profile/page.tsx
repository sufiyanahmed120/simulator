"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Calendar, Mail, User, Award, Target, TrendingUp } from 'lucide-react';
import { formatXP, calculateLevel, getLevelProgress } from '@/lib/utils';
import Link from 'next/link';

export default function ProfilePage() {
  // Mock user data for demonstration
  const user = {
    displayName: 'C++ Learner',
    email: 'learner@example.com',
    photoURL: null,
    xp: 0,
    level: 1,
    completedModules: [],
    createdAt: new Date(),
    lastLoginAt: new Date()
  };


  const level = calculateLevel(user.xp);
  const progress = getLevelProgress(user.xp);

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: '🎯',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      xpReward: 50
    },
    {
      id: '2',
      title: 'Code Warrior',
      description: 'Complete 5 modules',
      icon: '⚔️',
      unlocked: user.completedModules.length >= 5,
      unlockedAt: user.completedModules.length >= 5 ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : null,
      xpReward: 100
    },
    {
      id: '3',
      title: 'Debug Master',
      description: 'Fix 10 compilation errors',
      icon: '🐛',
      unlocked: false,
      unlockedAt: null,
      xpReward: 75
    },
    {
      id: '4',
      title: 'Learning Streak',
      description: 'Learn for 7 consecutive days',
      icon: '🔥',
      unlocked: false,
      unlockedAt: null,
      xpReward: 150
    }
  ];

  const stats = [
    {
      label: 'Total XP',
      value: formatXP(user.xp),
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      label: 'Current Level',
      value: level.toString(),
      icon: Trophy,
      color: 'text-blue-500'
    },
    {
      label: 'Modules Completed',
      value: user.completedModules.length.toString(),
      icon: Target,
      color: 'text-green-500'
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.unlocked).length.toString(),
      icon: Award,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Profile
        </h1>
        <p className="text-xl text-muted-foreground">
          Your C++ learning journey
        </p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
            ) : (
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center border-4 border-primary">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{user.displayName}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Member since {user.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg text-center">
              <div className="text-2xl font-bold">Level {level}</div>
              <div className="text-sm opacity-90">{formatXP(user.xp)} XP</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Level Progress</h3>
          <span className="text-sm text-muted-foreground">
            {user.xp % 100} / 100 XP to next level
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-6">Achievements</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-card border border-border rounded-lg p-6 ${
                achievement.unlocked ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {achievement.xpReward} XP
                    </span>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <span className="text-xs text-green-500">
                        {achievement.unlockedAt.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Completed Variables Module</div>
              <div className="text-sm text-muted-foreground">
                Earned 50 XP • 2 days ago
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Reached Level 2</div>
              <div className="text-sm text-muted-foreground">
                Unlocked new features • 1 week ago
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Unlocked First Steps Achievement</div>
              <div className="text-sm text-muted-foreground">
                Completed first module • 1 week ago
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
