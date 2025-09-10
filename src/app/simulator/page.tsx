"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, StepForward, RotateCcw, Copy, Download, Upload, Settings, Terminal, HardDrive } from 'lucide-react';

import { ExecutionResult, MemoryVariable, ExecutionStep } from '@/types';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />
});

const defaultCode = `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare variables
    int age = 25;
    string name = "John";
    double height = 1.75;
    
    // Print information
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << "m" << endl;
    
    // Calculate and display
    int birthYear = 2024 - age;
    cout << "Birth year: " << birthYear << endl;
    
    return 0;
}`;

export default function SimulatorPage() {
  const [code, setCode] = useState(defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isStepping, setIsStepping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [activeTab, setActiveTab] = useState<'output' | 'memory'>('output');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const editorRef = useRef<{ getValue: () => string; deltaDecorations: (oldDecorations: any[], newDecorations: any[]) => any[] } | null>(null);

  // Function to parse line number from stderr
  const parseErrorLineNumber = (stderr: string): number | null => {
    // Match patterns like: prog.cpp:5:10: error: ...
    // or: main.cpp:12:1: error: ...
    const match = stderr.match(/(?:prog\.cpp|main\.cpp|\.cpp):(\d+):/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Function to highlight error line in Monaco editor
  const highlightErrorLine = (lineNumber: number | null) => {
    if (!editorRef.current || !lineNumber) return;

    const decorations = lineNumber ? [{
      range: {
        startLineNumber: lineNumber,
        startColumn: 1,
        endLineNumber: lineNumber,
        endColumn: 1
      },
      options: {
        isWholeLine: true,
        className: 'error-line-highlight',
        glyphMarginClassName: 'error-glyph-margin',
        hoverMessage: { value: 'Compilation error on this line' }
      }
    }] : [];

    editorRef.current.deltaDecorations([], decorations);
  };

  // Effect to highlight error lines when execution result changes
  useEffect(() => {
    if (executionResult?.stderr) {
      const errorLine = parseErrorLineNumber(executionResult.stderr);
      highlightErrorLine(errorLine);
    } else {
      // Clear decorations when no errors
      if (editorRef.current) {
        editorRef.current.deltaDecorations([], []);
      }
    }
  }, [executionResult]);

  const runCode = async () => {
    if (!code.trim()) return;

    setIsRunning(true);
    setExecutionResult(null);
    setExecutionSteps([]);
    setCurrentStep(0);

    // Clear any existing error highlights
    if (editorRef.current) {
      editorRef.current.deltaDecorations([], []);
    }

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const result: ExecutionResult = await response.json();
        setExecutionResult(result);
        
        // Generate mock execution steps for visualization
        const steps: ExecutionStep[] = generateExecutionSteps(code);
        setExecutionSteps(steps);
      } else {
        const error = await response.json();
        setExecutionResult({
          stdout: '',
          stderr: error.message || 'Execution failed',
          exitCode: 1,
          executionTime: 0,
          memory: 0
        });
      }
    } catch {
      setExecutionResult({
        stdout: '',
        stderr: 'Network error: Unable to execute code',
        exitCode: 1,
        executionTime: 0,
        memory: 0
      });
    } finally {
      setIsRunning(false);
    }
  };

  const stepThroughCode = () => {
    if (executionSteps.length === 0) {
      runCode();
      return;
    }

    setIsStepping(true);
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsStepping(false);
    }
  };

  const resetExecution = () => {
    setCurrentStep(0);
    setIsStepping(false);
    setExecutionResult(null);
    setExecutionSteps([]);
    
    // Clear error highlights when resetting
    if (editorRef.current) {
      editorRef.current.deltaDecorations([], []);
    }
  };

  const generateExecutionSteps = (code: string): ExecutionStep[] => {
    const lines = code.split('\n');
    const steps: ExecutionStep[] = [];
    
    // Mock execution steps based on code analysis
    const variables: MemoryVariable[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes('int age = 25')) {
        variables.push({
          name: 'age',
          value: '25',
          type: 'int',
          address: `0x${(0x1000 + i).toString(16)}`,
          scope: 'stack'
        });
      } else if (line.includes('string name = "John"')) {
        variables.push({
          name: 'name',
          value: '"John"',
          type: 'string',
          address: `0x${(0x2000 + i).toString(16)}`,
          scope: 'stack'
        });
      } else if (line.includes('double height = 1.75')) {
        variables.push({
          name: 'height',
          value: '1.75',
          type: 'double',
          address: `0x${(0x3000 + i).toString(16)}`,
          scope: 'stack'
        });
      } else if (line.includes('int birthYear = 2024 - age')) {
        variables.push({
          name: 'birthYear',
          value: '1999',
          type: 'int',
          address: `0x${(0x4000 + i).toString(16)}`,
          scope: 'stack'
        });
      }
      
      if (line.includes('cout') || line.includes('int birthYear')) {
        steps.push({
          lineNumber: i + 1,
          variables: [...variables],
          stack: variables.filter(v => v.scope === 'stack'),
          heap: variables.filter(v => v.scope === 'heap')
        });
      }
    }
    
    return steps;
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'main.cpp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  const currentStepData = executionSteps[currentStep] || null;

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Code Simulator</h1>
          <p className="text-muted-foreground">
            Write, run, and debug C++ code in real-time
          </p>
        </div>
        
        {/* Toolbar */}
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={downloadCode}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            title="Download code"
          >
            <Download className="w-4 h-4" />
          </button>
          <label className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".cpp,.c,.h,.hpp"
              onChange={uploadCode}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Editor</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLineNumbers(!showLineNumbers)}
                className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                title="Toggle line numbers"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 border border-border rounded-lg overflow-hidden">
            <MonacoEditor
              height="100%"
              language="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: showLineNumbers ? 'on' : 'off',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
              }}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          {/* Execution Controls */}
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
            
            <button
              onClick={stepThroughCode}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <StepForward className="w-4 h-4" />
              <span>Step</span>
            </button>
            
            <button
              onClick={resetExecution}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Output & Memory</h2>
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'output' 
                    ? 'bg-background text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Terminal className="w-4 h-4 inline mr-1" />
                Output
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'memory' 
                    ? 'bg-background text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                                 <HardDrive className="w-4 h-4 inline mr-1" />
                Memory
              </button>
            </div>
          </div>

          <div className="flex-1 border border-border rounded-lg bg-background">
            {activeTab === 'output' ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                  {executionResult ? (
                    <div className="space-y-4">
                      {executionResult.stdout && (
                        <div>
                          <div className="text-green-500 font-semibold mb-2">Output:</div>
                          <pre className="text-green-400 whitespace-pre-wrap">{executionResult.stdout}</pre>
                        </div>
                      )}
                      {executionResult.stderr && (
                        <div>
                          <div className="text-red-500 font-semibold mb-2">Errors:</div>
                          <pre className="text-red-400 whitespace-pre-wrap font-mono text-sm leading-relaxed">{executionResult.stderr}</pre>
                        </div>
                      )}
                      <div className="text-muted-foreground text-xs">
                        Exit code: {executionResult.exitCode} | 
                        Execution time: {executionResult.executionTime}ms | 
                        Memory: {executionResult.memory}KB
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      Click &quot;Run&quot; to execute your code...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                  {currentStepData ? (
                    <div className="space-y-4">
                      <div className="text-blue-500 font-semibold">
                        Current Line: {currentStepData.lineNumber}
                      </div>
                      
                      <div>
                        <div className="text-green-500 font-semibold mb-2">Stack Variables:</div>
                        <div className="space-y-1">
                          {currentStepData.stack.map((variable, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span>{variable.name} ({variable.type})</span>
                              <span className="text-muted-foreground">{variable.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-yellow-500 font-semibold mb-2">Heap Variables:</div>
                        <div className="space-y-1">
                          {currentStepData.heap.length > 0 ? (
                            currentStepData.heap.map((variable, index) => (
                              <div key={index} className="flex justify-between text-xs">
                                <span>{variable.name} ({variable.type})</span>
                                <span className="text-muted-foreground">{variable.value}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-muted-foreground text-xs">No heap variables</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      Click &quot;Step&quot; to start stepping through your code...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add CSS for error highlighting */}
      <style jsx global>{`
        .error-line-highlight {
          background-color: rgba(207, 60, 60, 0.87) !important;
          border-left: 3px solid #ff4444 !important;
        }
        .error-glyph-margin {
          background-color: #ff4444 !important;
        }
      `}</style>
    </div>
  );
}
