'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import StudyDashboard from '../components/StudyDashboard'
import AIAssistant from '../components/AIAssistant'
import StudyTimer from '../components/StudyTimer'
import TaskList from '../components/TaskList'
import CourseworkUpload from '../components/CourseworkUpload'
import AIStudySession from '../components/AIStudySession'
import AIQuizGenerator from '../components/AIQuizGenerator'
import SmartStudyRecommendations from '../components/SmartStudyRecommendations'
import AITeachingAssistant from '../components/AITeachingAssistant'
import ProgressTracking from '../components/ProgressTracking'

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; username: string; role: 'student' | 'professor' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <main className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6 bg-navy-800 text-white p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-gold-500">AI Study Buddy Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-navy-700">Logout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <StudyDashboard userId={user.id} />
          <div className="mt-6">
            <StudyTimer userId={user.id} />
          </div>
          <div className="mt-6">
            <SmartStudyRecommendations userId={user.id} />
          </div>
        </div>
        <div>
          <AIAssistant />
          <div className="mt-6">
            <TaskList userId={user.id} />
          </div>
          <div className="mt-6">
            <AITeachingAssistant userId={user.id} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        {user.role === 'professor' && <CourseworkUpload userId={user.id} />}
        {user.role === 'student' && (
          <>
            <AIStudySession />
            <div className="mt-6">
              <AIQuizGenerator userId={user.id} />
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <ProgressTracking userId={user.id} role={user.role} />
      </div>
    </main>
  )
}

