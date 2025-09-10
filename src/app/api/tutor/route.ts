import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        content: "Sorry, I'm having trouble right now. Please try again later.",
        codeBlocks: []
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Prepare conversation history in Gemini format
    const chatHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Create chat session with system instructions
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `You are a C++ programming teacher for beginners. Your instructions:
1. Explain C++ concepts in simple, beginner-friendly English
2. Always provide clear and runnable C++ code examples inside \`\`\`cpp code blocks
3. Break down complex topics into easy-to-understand steps
4. Be encouraging and supportive
5. Focus on practical examples that students can run and experiment with
6. If asked about non-C++ topics, politely redirect to C++ programming

Remember: Always use \`\`\`cpp for code blocks and make explanations beginner-friendly.` }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand! I\'m your C++ programming tutor. I\'ll explain concepts in simple terms and provide clear, runnable code examples. I\'m here to help you learn C++ step by step. What would you like to learn about today?' }]
        },
        ...chatHistory
      ]
    });

    // Send user message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Extract code blocks from Gemini response
    const codeBlocks: { language: string; code: string }[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeBlocks.push({
        language: match[1] || 'cpp',
        code: match[2].trim()
      });
    }

    const content = text.replace(codeBlockRegex, '').trim();

    return NextResponse.json({
      content,
      codeBlocks
    });
  } catch (error) {
    console.error('Tutor API error:', error);

    return NextResponse.json({
      content: "Sorry, I'm having trouble right now. Please try again later.",
      codeBlocks: []
    });
  }
}

