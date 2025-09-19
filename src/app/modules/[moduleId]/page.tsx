"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle, Clock, Star, BookOpen, Code, Lightbulb, Target } from 'lucide-react';
// import { Module } from '@/types';
import { modules, moduleContent } from '@/data/modules';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  // Find the module data
  const moduleData = modules.find(m => m.id === moduleId);
  const content = moduleContent[moduleId];

  if (!moduleData || !content) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The module you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/modules')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = false; // Module completion tracking removed

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => router.push('/modules')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold gradient-text">{moduleData.title}</h1>
          <p className="text-muted-foreground">{moduleData.description}</p>
        </div>
      </div>

      {/* Module Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              moduleData.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              moduleData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {moduleData.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">{moduleData.estimatedTime}m</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">{moduleData.xpReward} XP</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Play className="w-5 h-5 text-primary" />
            )}
            <span className="text-sm text-muted-foreground">
              {isCompleted ? 'Completed' : 'Start Learning'}
            </span>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <span>Topics Covered</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {moduleData.topics.map((topic, index) => (
            <div
              key={index}
              className="px-3 py-2 bg-muted rounded-lg text-sm text-center"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <span>Introduction</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {content.introduction}
        </p>
      </motion.div>

      {/* Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Code className="w-5 h-5 text-primary" />
          <span>Examples</span>
        </h2>
        <div className="space-y-6">
          {content.examples.map((example, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-medium text-lg">{example.title}</h3>
              <p className="text-muted-foreground">{example.description}</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Uses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <span>Practical Uses</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {content.uses.map((use, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{use.title}</h3>
              <p className="text-sm text-muted-foreground">{use.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => router.push('/modules')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Modules
        </motion.button>
        <motion.button
          onClick={() => router.push('/simulator')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4 mr-2" />
          <span>Start Practice</span>
        </motion.button>
      </div>
    </div>
  );
}
