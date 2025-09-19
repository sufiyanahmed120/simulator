"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Code2, 
  MessageCircle, 
  Play, 
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  BarChart3
} from 'lucide-react';
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
  const pathname = usePathname();
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
                      ? "bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white font-semibold shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  title={isCollapsed ? item.name : undefined}
                  onClick={closeMobileMenu}
                >
                  <item.icon className={cn(
                    "w-6 h-6 flex-shrink-0 transition-all duration-300 ease-in-out",
                    isActive ? "text-white" : "group-hover:scale-110"
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

        </div>
      </div>
    </>
  );
}
