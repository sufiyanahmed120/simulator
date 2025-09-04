"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, BarChart3, Code2, Play, MessageCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text">
          Welcome to C++ Simulator
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Master C++ programming with interactive lessons, real-time code execution, and AI-powered tutoring
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Link href="/modules">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <BookOpen className="w-6 h-6" />
            <span>Start Learning</span>
          </motion.button>
        </Link>
        
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span>Go to Dashboard</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6 pt-12"
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Interactive Modules</h3>
          <p className="text-muted-foreground">Learn C++ step by step with hands-on examples</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Code Simulator</h3>
          <p className="text-muted-foreground">Practice coding with real-time compilation</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold">AI Tutor</h3>
          <p className="text-muted-foreground">Get personalized help and guidance</p>
        </div>
      </motion.div>
    </div>
  );
}
