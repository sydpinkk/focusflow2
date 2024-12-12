'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
//import { toast } from '@/components/ui/use-toast'


export default function StudyTimer() {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [inputTime, setInputTime] = useState('25')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      toast({
        title: "Time's up!",
        description: "Your study session is complete.",
      })
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(parseInt(inputTime) * 60)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">{formatTime(time)}</div>
          <div className="space-x-2 mb-4">
            <Button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
            <Button onClick={resetTimer} variant="outline">Reset</Button>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Input
              type="number"
              value={inputTime}
              onChange={handleInputChange}
              className="w-20 text-center"
              min="1"
            />
            <span>minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

