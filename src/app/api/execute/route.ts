import { NextRequest, NextResponse } from 'next/server';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Check if Judge0 API key is available
    if (!process.env.RAPIDAPI_KEY) {
      return NextResponse.json({
        stdout: '',
        stderr: 'RAPIDAPI_KEY not configured. Please add your RapidAPI key to .env.local',
        exitCode: 1,
        executionTime: 0,
        memory: 0
      });
    }

    // Create submission
    const createResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        language_id: 54, // C++ (GCC 9.2.0)
        source_code: code,
        stdin: ''
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return NextResponse.json({
        stdout: '',
        stderr: `API Error: ${createResponse.status} - ${errorText}`,
        exitCode: 1,
        executionTime: 0,
        memory: 0
      });
    }

    const submission = await createResponse.json();
    const token = submission.token;

    // Poll for results
    let result = null;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (attempts < maxAttempts) {
      const getResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}`, {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      });

      if (!getResponse.ok) {
        const errorText = await getResponse.text();
        return NextResponse.json({
          stdout: '',
          stderr: `API Error: ${getResponse.status} - ${errorText}`,
          exitCode: 1,
          executionTime: 0,
          memory: 0
        });
      }

      result = await getResponse.json();

      if (result.status.id > 2) { // Status > 2 means processing is complete
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      attempts++;
    }

    if (!result) {
      return NextResponse.json({
        stdout: '',
        stderr: 'Execution timeout - code took too long to compile/run',
        exitCode: 1,
        executionTime: 0,
        memory: 0
      });
    }

    // Handle different status codes
    switch (result.status.id) {
      case 3: // Accepted
        return NextResponse.json({
          stdout: result.stdout || '',
          stderr: result.stderr || '',
          exitCode: result.exit_code || 0,
          executionTime: result.time || 0,
          memory: result.memory || 0
        });

      case 4: // Wrong Answer
        return NextResponse.json({
          stdout: result.stdout || '',
          stderr: result.stderr || 'Wrong Answer',
          exitCode: result.exit_code || 1,
          executionTime: result.time || 0,
          memory: result.memory || 0
        });

      case 5: // Time Limit Exceeded
        return NextResponse.json({
          stdout: '',
          stderr: 'Time Limit Exceeded',
          exitCode: 1,
          executionTime: 0,
          memory: 0
        });

      case 6: // Compilation Error
        return NextResponse.json({
          stdout: '',
          stderr: result.compile_output || 'Compilation Error',
          exitCode: 1,
          executionTime: 0,
          memory: 0
        });

      case 7: // Runtime Error
        return NextResponse.json({
          stdout: result.stdout || '',
          stderr: result.stderr || 'Runtime Error',
          exitCode: result.exit_code || 1,
          executionTime: result.time || 0,
          memory: result.memory || 0
        });

      default:
        return NextResponse.json({
          stdout: result.stdout || '',
          stderr: result.stderr || `Unknown Error (Status: ${result.status.id})`,
          exitCode: result.exit_code || 1,
          executionTime: result.time || 0,
          memory: result.memory || 0
        });
    }

  } catch (error) {
    console.error('Execution API error:', error);
    
    // Return real error instead of mock data
    return NextResponse.json({
      stdout: '',
      stderr: `Network/Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      exitCode: 1,
      executionTime: 0,
      memory: 0
    });
  }
}
