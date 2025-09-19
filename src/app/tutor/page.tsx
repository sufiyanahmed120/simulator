"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Bot, User, Loader2 } from 'lucide-react';

import { ChatMessage } from '@/types';
import { generateId } from '@/lib/utils';


export default function TutorPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial-message',
      role: 'assistant',
      content: "Hello! I'm your C++ AI Tutor. I can help you with:\n\n• Understanding C++ concepts\n• Debugging code\n• Explaining programming concepts\n• Providing code examples\n\nWhat would you like to learn about today?",
      timestamp: new Date('2025-01-01T00:00:00Z'), // Static timestamp to avoid hydration issues
      codeBlocks: []
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      codeBlocks: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: data.content,
          timestamp: new Date(),
          codeBlocks: data.codeBlocks || []
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Show error message from API
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: "Sorry, I'm having trouble right now. Please try again later.",
          timestamp: new Date(),
          codeBlocks: []
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message on network/other errors
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: "Sorry, I'm having trouble right now. Please try again later.",
        timestamp: new Date(),
        codeBlocks: []
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('•')) {
          return <li key={index} className="ml-4">{line.substring(1)}</li>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={index}>{line.slice(2, -2)}</strong>;
        }
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-purple-50/50 dark:from-slate-900/50 dark:via-blue-950/30 dark:to-purple-950/50 rounded-xl p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Tutor</h1>
        <p className="text-muted-foreground">
          Ask me anything about C++ programming!
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                {/* Message Bubble */}
                <div className={`rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white ml-4' 
                    : 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-200/20 dark:border-blue-700/20 mr-4'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    <div className={`${message.role === 'user' ? 'text-white' : 'text-foreground'}`}>
                      {formatMessage(message.content)}
                    </div>
                  </div>
                  
                  {/* Code Blocks */}
                  {message.codeBlocks && message.codeBlocks.map((block, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs uppercase font-medium ${
                          message.role === 'user' ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {block.language}
                        </span>
                        <button
                          onClick={() => copyToClipboard(block.code)}
                          className={`flex items-center space-x-1 text-xs transition-colors ${
                            message.role === 'user' 
                              ? 'text-white/80 hover:text-white' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {copiedCode === block.code ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-slate-900 dark:bg-slate-800 p-4 rounded-xl overflow-x-auto text-sm text-slate-100">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  ))}
                  
                  <div className={`text-xs mt-3 ${
                    message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {mounted ? message.timestamp.toLocaleTimeString() : '11:18:13'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-200/20 dark:border-blue-700/20 rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm mr-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-sm text-foreground font-medium">AI Tutor is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Bar */}
      <div className="flex items-end space-x-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20 dark:border-slate-700/20">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your C++ question here... Press Enter to send"
            className="w-full p-4 bg-transparent border-none resize-none focus:outline-none text-foreground placeholder-muted-foreground/70 text-sm leading-relaxed"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
