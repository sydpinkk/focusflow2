'use client'

import { useState } from 'react'
import PDFUploader from './components/PDFUploader'
import QuizGenerator from './components/QuizGenerator'
import Quiz from './components/Quiz'
import StudyTimer from './components/StudyTimer'
import StudyTips from './components/StudyTips'
import { GraduationCap } from 'lucide-react'

export default function Home() {
  const [pdfContent, setPdfContent] = useState<string | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])

  const handlePDFUpload = (content: string) => {
    setPdfContent(content)
  }

  const handleQuizGenerated = (questions: any[]) => {
    setQuizQuestions(questions)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <GraduationCap className="inline-block text-primary w-16 h-16 mb-4" />
          <h1 className="text-4xl font-bold text-primary">FocusFlow</h1>
          <p className="text-xl text-muted-foreground mt-2">Enhance Your Study Experience</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PDFUploader onUpload={handlePDFUpload} />
            {pdfContent && (
              <QuizGenerator 
                pdfContent={pdfContent} 
                onQuizGenerated={handleQuizGenerated}
              />
            )}
            {quizQuestions.length > 0 && (
              <Quiz questions={quizQuestions} />
            )}
          </div>
          <div className="space-y-8">
            <StudyTimer />
            <StudyTips />
          </div>
        </div>
      </div>
    </main>
  )
}

