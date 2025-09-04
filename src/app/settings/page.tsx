"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Sun, Moon, Monitor, HelpCircle, Mail, MessageCircle, Github, BookOpen, Shield, Bell } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn how to use the C++ Learning Simulator',
      icon: BookOpen,
      href: '#'
    },
    {
      title: 'Code Simulator',
      description: 'How to write and run C++ code',
      icon: Settings,
      href: '#'
    },
    {
      title: 'AI Tutor',
      description: 'Get help from our AI programming assistant',
      icon: MessageCircle,
      href: '#'
    },
    {
      title: 'Progress Tracking',
      description: 'Understanding XP, levels, and achievements',
      icon: Shield,
      href: '#'
    }
  ];

  const contactOptions = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      icon: Mail,
      href: 'mailto:support@cppsimulator.com'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      href: '#'
    },
    {
      title: 'GitHub Issues',
      description: 'Report bugs or request features',
      icon: Github,
      href: 'https://github.com/cppsimulator/issues'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Settings
        </h1>
        <p className="text-xl text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Appearance</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Theme</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'light'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'system'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border hover:bg-muted'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>System</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-muted-foreground">
                Get notified about new modules and achievements
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Updates</div>
              <div className="text-sm text-muted-foreground">
                Receive weekly progress reports via email
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Help & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <HelpCircle className="w-6 h-6" />
          <span>Help & Support</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Help Topics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Help Topics</h3>
            <div className="space-y-3">
              {helpTopics.map((topic) => (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{topic.title}</div>
                    <div className="text-sm text-muted-foreground">{topic.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
            <div className="space-y-3">
              {contactOptions.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Account</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
            <div>
              <div className="font-medium">Account Status</div>
              <div className="text-sm text-muted-foreground">
                {user?.email} • Active
              </div>
            </div>
            <div className="text-sm text-green-500 font-medium">Active</div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={signOut}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              Sign Out
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </motion.div>

      {/* App Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6">About</h2>
        
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span>2024.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            C++ Learning Simulator is designed to make learning C++ programming fun and interactive. 
            Built with Next.js, TypeScript, and modern web technologies.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
