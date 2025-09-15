"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Bot, User, Loader2 } from 'lucide-react';

import { ChatMessage } from '@/types';
import { generateId } from '@/lib/utils';


export default function TutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: "Hello! I'm your C++ AI Tutor. I can help you with:\n\n• Understanding C++ concepts\n• Debugging code\n• Explaining programming concepts\n• Providing code examples\n\nWhat would you like to learn about today?",
      timestamp: new Date(),
      codeBlocks: []
    }
  ]);
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
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Tutor</h1>
        <p className="text-muted-foreground">
          Ask me anything about C++ programming!
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-lg p-4 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border border-border'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    {formatMessage(message.content)}
                  </div>
                  
                  {/* Code Blocks */}
                  {message.codeBlocks && message.codeBlocks.map((block, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground uppercase font-medium">
                          {block.language}
                        </span>
                        <button
                          onClick={() => copyToClipboard(block.code)}
                          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  ))}
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">AI Tutor is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about C++ programming..."
            className="w-full p-3 pr-12 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
