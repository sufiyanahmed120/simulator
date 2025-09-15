"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Code2, 
  MessageCircle, 
  Play, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  BarChart3
} from 'lucide-react';
import { useAuth } from './auth-provider';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Modules', href: '/modules', icon: Code2 },
  { name: 'AI Tutor', href: '/tutor', icon: MessageCircle },
  { name: 'Simulator', href: '/simulator', icon: Play },
];

export function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, signIn, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle body class for sidebar state
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [isCollapsed]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 ease-in-out"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "sidebar fixed left-0 top-0 h-full bg-card border-r border-border z-50 shadow-lg",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-900/50 dark:to-slate-800/50">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ease-in-out">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 dark:text-white">C++ Simulator</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Learning Platform</span>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 ease-in-out hidden lg:block"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 ease-in-out lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6">
          <div className="space-y-2 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out group hover:scale-105",
                    isActive
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  title={isCollapsed ? item.name : undefined}
                  onClick={closeMobileMenu}
                >
                  <item.icon className={cn(
                    "w-6 h-6 flex-shrink-0 transition-all duration-300 ease-in-out",
                    isActive ? "text-emerald-600 dark:text-emerald-400" : "group-hover:scale-110"
                  )} />
                  {!isCollapsed && (
                    <span className="transition-all duration-300 ease-in-out">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="border-t border-border p-4 space-y-3 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900/30 dark:to-transparent">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out hover:scale-105",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "Toggle theme" : undefined}
          >
            {mounted && (theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />)}
            {!isCollapsed && <span>Toggle Theme</span>}
          </button>

          {/* Profile Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out hover:scale-105",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? user.displayName : undefined}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-700">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-muted-foreground truncate">{user.displayName}</span>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 mb-2 w-full bg-card border border-border rounded-lg shadow-xl py-2 backdrop-blur-sm"
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setProfileDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              onClick={signIn}
              className={cn(
                "w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-3 rounded-lg text-base font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl",
                isCollapsed && "px-3"
              )}
              title={isCollapsed ? "Sign In" : undefined}
            >
              {isCollapsed ? <User className="w-6 h-6 mx-auto" /> : "Sign In"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
