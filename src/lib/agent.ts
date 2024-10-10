'use server only'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamToResponse } from "ai";
import { PDFDocument } from 'pdf-lib';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// AI agent function using Gemini 1.5
async function aiAgentProcess(pdfContent: Uint8Array, agentName: string): Promise<{ content: Uint8Array; explanation: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  // Convert PDF content to base64 for Gemini input
  const base64PDF = Buffer.from(pdfContent).toString('base64');
  const prompt = `You are ${agentName}, an AI assistant specialized in enhancing resumes. Analyze the given resume and suggest improvements to make it more effective and professional. Focus on improving content, structure, and formatting.`;
  const result = await model.generateContent([prompt, { inlineData: { data: base64PDF, mimeType: "application/pdf" } }]);
  const explanation = result.response.text();
  // In a real-world scenario, you'd parse the AI's suggestions and apply them to the PDF
  // For this example, we'll return the original content with the explanation
  return {
    content: pdfContent,
    explanation: explanation
  };
}

// Grading agent function using Gemini 1.5
async function gradingAgent(results: { content: Uint8Array; explanation: string }[]): Promise<{ bestVersion: Uint8Array; reasoning: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `You are a grading agent. Evaluate the following resume enhancement explanations and choose the best one. Provide reasoning for your choice.

  ${results.map((result, index) => `Version ${index + 1}: ${result.explanation}`).join('\n\n')}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const reasoning = response.text();

  // Extract the chosen version from the AI's reasoning
  const bestVersionMatch = reasoning.match(/Version (\d+)/);
  const bestIndex = bestVersionMatch ? parseInt(bestVersionMatch[1]) - 1 : 0;

  console.log(results[bestIndex].content);
  console.log(reasoning);
  return {
    bestVersion: results[bestIndex].content,
    reasoning: reasoning
  };
}

export async function enhanceResume(file: File): Promise<{ enhancedResume: Uint8Array; explanation: string }> {
  // Step 1: Read the PDF file
  const arrayBuffer = await file.arrayBuffer();
  const pdfContent = new Uint8Array(arrayBuffer);

  // Step 2: Process with three AI agents
  const agentPromises = [
    aiAgentProcess(pdfContent, "Agent 1"),
    aiAgentProcess(pdfContent, "Agent 2"),
    aiAgentProcess(pdfContent, "Agent 3")
  ];

  const agentResults = await Promise.all(agentPromises);

  // Step 3: Grade the results
  const { bestVersion, reasoning } = await gradingAgent(agentResults);

  return {
    enhancedResume: bestVersion,
    explanation: reasoning
  };
}

export async function savePDF(pdfContent: Uint8Array, fileName: string): Promise<void> {
  const pdfDoc = await PDFDocument.load(pdfContent);
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}