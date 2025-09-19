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

export default function DashboardPage() {

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


  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 h-full px-2 sm:px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Welcome to C++ Learning Simulator
        </h1>
        <p className="text-xl text-muted-foreground">
          Master C++ programming with interactive lessons and AI-powered tutoring
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
              <h3 className="text-lg font-semibold">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Learning Progress</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Start Learning</span>
              <span>Unlimited Access</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Begin your C++ journey today
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
                0
              </h3>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-3xl font-bold text-green-600">
              0%
            </div>
            <p className="text-sm text-muted-foreground">
              8 modules available to explore
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
                0
              </h3>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-muted"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              3 achievements to unlock
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
