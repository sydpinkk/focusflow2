'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
//import { toast } from '@/components/ui/use-toast'
import { CheckCircle2, XCircle, Award } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface QuizProps {
  questions: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

export default function Quiz({ questions }: QuizProps) {
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answerIndex
    setUserAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (userAnswers.includes(-1)) {
      toast({
        title: "Error",
        description: "Please answer all questions before submitting",
        variant: "destructive",
      })
      return
    }

    setSubmitted(true)
    const newScore = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
    setScore(newScore)

    toast({
      title: "Quiz Submitted",
      description: `You scored ${newScore} out of ${questions.length}`,
    })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Award className="mr-2 text-primary" />
          Quiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">{qIndex + 1}. {question.question}</h3>
            <RadioGroup
              value={userAnswers[qIndex].toString()}
              onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
            >
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                  <Label htmlFor={`q${qIndex}-o${oIndex}`} className="text-sm">{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {submitted && (
              <div className={`mt-2 flex items-center ${userAnswers[qIndex] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                {userAnswers[qIndex] === question.correctAnswer ? (
                  <><CheckCircle2 className="mr-1" /> Correct!</>
                ) : (
                  <><XCircle className="mr-1" /> Incorrect. The correct answer is: {question.options[question.correctAnswer]}</>
                )}
              </div>
            )}
          </div>
        ))}
        {!submitted && (
          <Button onClick={handleSubmit} className="w-full mt-4">
            Submit Quiz
          </Button>
        )}
        {submitted && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold">Your Score</h3>
            <p className="text-3xl font-bold text-primary mt-2">{score} / {questions.length}</p>
            <p className="text-muted-foreground mt-1">
              {score === questions.length ? "Perfect score! Great job!" : 
               score >= questions.length * 0.8 ? "Excellent work!" : 
               score >= questions.length * 0.6 ? "Good job!" : 
               "Keep practicing!"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

