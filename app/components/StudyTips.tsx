'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const tips = [
  "Break your study sessions into 25-minute focused intervals, followed by 5-minute breaks.",
  "Create a dedicated study space free from distractions.",
  "Use active recall techniques by testing yourself on the material.",
  "Teach the concept to someone else to reinforce your understanding.",
  "Use mnemonic devices to remember complex information.",
  "Review your notes within 24 hours of taking them to improve retention.",
  "Stay hydrated and maintain a healthy diet to boost cognitive function.",
  "Get enough sleep to consolidate memories and improve focus.",
  "Use color-coding and visual aids in your notes to enhance memory.",
  "Practice mindfulness or meditation to reduce stress and improve concentration."
]

export default function StudyTips() {
  const [currentTip, setCurrentTip] = useState(tips[0])

  const getRandomTip = () => {
    let newTip
    do {
      newTip = tips[Math.floor(Math.random() * tips.length)]
    } while (newTip === currentTip)
    setCurrentTip(newTip)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentTip}</p>
        <Button onClick={getRandomTip} variant="outline">New Tip</Button>
      </CardContent>
    </Card>
  )
}

