import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Return fallback response
      return NextResponse.json({
        content: "I'm here to help you with C++ programming! Since I'm currently in demo mode, here are some common C++ topics you can ask about:\n\n• Variables and data types\n• Control flow (if-else, loops)\n• Functions and parameters\n• Arrays and vectors\n• Pointers and references\n• Classes and objects\n\nWhat specific C++ concept would you like to learn about?",
        codeBlocks: []
      });
    }

    // Prepare conversation history
    const messages = [
      {
        role: 'system' as const,
        content: `You are a helpful C++ programming tutor for college beginners. Your role is to:

1. Explain C++ concepts in simple, beginner-friendly terms
2. Provide clear code examples with proper syntax highlighting
3. Help debug common programming issues
4. Encourage learning and experimentation
5. Use a friendly, encouraging tone

When providing code examples:
- Always use proper C++ syntax
- Include necessary headers (#include statements)
- Add comments to explain what the code does
- Format code blocks with \`\`\`cpp markers

Keep responses concise but informative. Focus on practical examples that students can run and experiment with.`
      },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '';

    // Extract code blocks from the response
    const codeBlocks: { language: string; code: string }[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(response)) !== null) {
      codeBlocks.push({
        language: match[1] || 'cpp',
        code: match[2].trim()
      });
    }

    // Remove code blocks from the content for cleaner display
    const content = response.replace(codeBlockRegex, '').trim();

    return NextResponse.json({
      content,
      codeBlocks
    });

  } catch (error) {
    console.error('Tutor API error:', error);
    
    // Return fallback response on error
    return NextResponse.json({
      content: "I'm having trouble connecting right now, but I can still help you with C++! Here's a quick tip about variables:\n\nIn C++, variables are containers for storing data. You declare them with a data type and name:\n\n```cpp\nint number = 42;\ndouble decimal = 3.14;\nstring text = \"Hello\";\n```\n\nTry asking me about a specific C++ topic, and I'll do my best to help!",
      codeBlocks: [
        {
          language: "cpp",
          code: "int number = 42;\ndouble decimal = 3.14;\nstring text = \"Hello\";"
        }
      ]
    });
  }
}
