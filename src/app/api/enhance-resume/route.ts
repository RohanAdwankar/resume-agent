import { NextResponse } from 'next/server';
import { enhanceResume } from '@/lib/agent';  // Import your existing enhanceResume function

export async function POST(request: Request) {
  try {
    const { file } = await request.json();
    const fileBuffer = Buffer.from(file, 'base64');
    const result = await enhanceResume(fileBuffer);
    
    return NextResponse.json({
      enhancedResume: Buffer.from(result.enhancedResume).toString('base64'),
      explanation: result.explanation,
    });
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return NextResponse.json({ message: 'Error enhancing resume' }, { status: 500 });
  }
}