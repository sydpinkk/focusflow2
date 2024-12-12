'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
//import { toast } from '@/components/ui/use-toast'
import { BrainCircuit, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface QuizGeneratorProps {
  pdfContent: string
  onQuizGenerated: (questions: any[]) => void
}

export default function QuizGenerator({ pdfContent, onQuizGenerated }: QuizGeneratorProps) {
  const [numQuestions, setNumQuestions] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateQuiz = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfContent, numQuestions }),
      })

      if (response.ok) {
        const data = await response.json()
        onQuizGenerated(data.questions)
        toast({
          title: "Success",
          description: "Quiz generated successfully!",
        })
      } else {
        throw new Error('Failed to generate quiz')
      }
    } catch (error) {
      console.error('Error generating quiz:', error)
      toast({
        title: "Error",
        description: "An error occurred while generating the quiz",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <BrainCircuit className="mr-2 text-primary" />
          Generate Quiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium text-muted-foreground mb-1">
              Number of Questions
            </label>
            <Input
              type="number"
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              min={1}
              max={20}
              className="w-full"
            />
          </div>
          <Button onClick={handleGenerateQuiz} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              'Generate Quiz'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

