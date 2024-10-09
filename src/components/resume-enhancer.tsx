"use client"

import { useState, useEffect } from 'react'
import { Upload, FileText, Check, User } from 'lucide-react'

export function ResumeEnhancerComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please upload a PDF file')
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (file) {
      setIsProcessing(true)
      // Simulating the processing time
      setTimeout(() => {
        setIsProcessing(false)
        setFile(null)
      }, 15000)
    }
  }

  useEffect(() => {
    if (isProcessing) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 1
          if (newProgress === 100) {
            clearInterval(timer)
          }
          return newProgress
        })
      }, 150)
      return () => clearInterval(timer)
    }
  }, [isProcessing])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">AI Resume Enhancer</h1>
      
      {!isProcessing ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center hover:border-blue-300 transition-colors duration-300">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload size={48} className="mx-auto mb-4 text-blue-500" />
              <p className="text-lg mb-2">
                {file ? file.name : 'Upload your resume (PDF)'}
              </p>
              <p className="text-sm text-gray-400">Click or drag and drop</p>
            </label>
          </div>
          <button
            type="submit"
            disabled={!file}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enhance Resume
          </button>
        </form>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-2xl font-semibold mb-2">Enhancing your resume...</p>
            <p className="text-gray-400">Our AI agents are working their magic</p>
          </div>
          <div className="relative">
            {/* Flow diagram */}
            <svg className="w-full" viewBox="0 0 800 300">
              {/* Static blue lines */}
              <path d="M100,150 L350,50" className="stroke-blue-500 stroke-[6]" />
              <path d="M100,150 L350,150" className="stroke-blue-500 stroke-[6]" />
              <path d="M100,150 L350,250" className="stroke-blue-500 stroke-[6]" />
              <path d="M450,50 L700,150" className="stroke-blue-500 stroke-[6]" />
              <path d="M450,150 L700,150" className="stroke-blue-500 stroke-[6]" />
              <path d="M450,250 L700,150" className="stroke-blue-500 stroke-[6]" />
              
              {/* Animated green lines */}
              <path d="M100,150 L350,50" className="stroke-green-500 stroke-[6]" strokeDasharray="280" strokeDashoffset="280">
                <animate attributeName="stroke-dashoffset" from="280" to="0" dur="7.5s" begin="0s" fill="freeze" />
              </path>
              <path d="M100,150 L350,150" className="stroke-green-500 stroke-[6]" strokeDasharray="250" strokeDashoffset="250">
                <animate attributeName="stroke-dashoffset" from="250" to="0" dur="7.5s" begin="0s" fill="freeze" />
              </path>
              <path d="M100,150 L350,250" className="stroke-green-500 stroke-[6]" strokeDasharray="280" strokeDashoffset="280">
                <animate attributeName="stroke-dashoffset" from="280" to="0" dur="7.5s" begin="0s" fill="freeze" />
              </path>
              <path d="M450,50 L700,150" className="stroke-green-500 stroke-[6]" strokeDasharray="280" strokeDashoffset="280">
                <animate attributeName="stroke-dashoffset" from="280" to="0" dur="7.5s" begin="7.5s" fill="freeze" />
              </path>
              <path d="M450,150 L700,150" className="stroke-green-500 stroke-[6]" strokeDasharray="250" strokeDashoffset="250">
                <animate attributeName="stroke-dashoffset" from="250" to="0" dur="7.5s" begin="7.5s" fill="freeze" />
              </path>
              <path d="M450,250 L700,150" className="stroke-green-500 stroke-[6]" strokeDasharray="280" strokeDashoffset="280">
                <animate attributeName="stroke-dashoffset" from="280" to="0" dur="7.5s" begin="7.5s" fill="freeze" />
              </path>
            </svg>
            
            {/* Nodes */}
            <div className="absolute top-1/2 left-24 transform -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div className="absolute top-1/2 right-24 transform -translate-y-1/2 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Check size={32} />
            </div>
            
            {/* Labels */}
            <div className="absolute top-1/2 left-24 transform -translate-y-1/2 mt-20 text-center w-16">
              <p className="text-sm">Input</p>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-20 text-center w-16">
              <p className="text-sm">Writers</p>
            </div>
            <div className="absolute top-1/2 right-24 transform -translate-y-1/2 mt-20 text-center w-16">
              <p className="text-sm">Grader</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}