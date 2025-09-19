"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, CheckCircle, Clock, Star, BookOpen } from 'lucide-react';
// import { Module } from '@/types';
import Link from 'next/link';
import { modules } from '@/data/modules';

const difficultyColors = {
  Beginner: 'bg-emerald-600 text-white font-bold',
  Intermediate: 'bg-orange-600 text-white font-bold',
  Advanced: 'bg-red-600 text-white font-bold'
};

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter]);



  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Learning Modules
        </h1>
        <p className="text-xl text-muted-foreground">
          Master C++ programming step by step
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary [&>option]:bg-slate-900 [&>option]:text-white dark:[&>option]:bg-slate-800 dark:[&>option]:text-slate-100"
        >
          <option value="all" className="bg-white text-black dark:bg-slate-800 dark:text-white">All Difficulties</option>
          <option value="Beginner" className="bg-white text-black dark:bg-slate-800 dark:text-white">Beginner</option>
          <option value="Intermediate" className="bg-white text-black dark:bg-slate-800 dark:text-white">Intermediate</option>
          <option value="Advanced" className="bg-white text-black dark:bg-slate-800 dark:text-white">Advanced</option>
        </select>
      </div>

      {/* Progress Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{modules.length}</div>
            <div className="text-sm text-muted-foreground">Total Modules</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              0
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              0%
            </div>
            <div className="text-sm text-muted-foreground">Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              0
            </div>
            <div className="text-sm text-muted-foreground">XP Earned</div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module, index) => {
                      const isCompleted = false; // Module completion tracking removed
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/modules/${module.id}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className={`px-3 py-1 rounded-full text-xs ${difficultyColors[module.difficulty]}`}>
                        {module.difficulty}
                      </span>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {module.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                        +{module.topics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.estimatedTime}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{module.xpReward} XP</span>
                      </div>
                    </div>
                    <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No modules found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
