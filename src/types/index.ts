export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  xp: number;
  level: number;
  achievements: Achievement[];
  completedModules: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  xpReward: number;
  estimatedTime: number; // in minutes
  isCompleted: boolean;
  progress: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  xpReward: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeBlocks?: CodeBlock[];
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  memory: number;
}

export interface MemoryVariable {
  name: string;
  value: string;
  type: string;
  address: string;
  scope: 'stack' | 'heap' | 'global';
}

export interface ExecutionStep {
  lineNumber: number;
  variables: MemoryVariable[];
  stack: MemoryVariable[];
  heap: MemoryVariable[];
}

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: 'cpp' | 'programming' | 'learning';
  date: Date;
}
