'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { ExamName, ReservationCategory } from '@/types'

interface PredictorFormProps {
  onSubmit: (examName: ExamName, rank: number, category: ReservationCategory) => void
  loading: boolean
}

const EXAMS: { value: ExamName; label: string }[] = [
  { value: 'JEE_MAIN', label: 'JEE Main (for NITs/IIITs/GFTIs)' },
  { value: 'JEE_ADVANCED', label: 'JEE Advanced (for IITs)' },
  { value: 'NEET', label: 'NEET (for Medical Colleges)' },
  { value: 'CAT', label: 'CAT (for MBA/Management Colleges)' },
  { value: 'GATE', label: 'GATE (for M.Tech/Engineering Masters)' }
]

const CATEGORIES: { value: ReservationCategory; label: string }[] = [
  { value: 'General', label: 'General / Open' },
  { value: 'OBC', label: 'OBC-NCL' },
  { value: 'SC', label: 'Scheduled Caste (SC)' },
  { value: 'ST', label: 'Scheduled Tribe (ST)' },
  { value: 'EWS', label: 'Economically Weaker Section (EWS)' }
]

export default function PredictorForm({ onSubmit, loading }: PredictorFormProps) {
  const [examName, setExamName] = useState<ExamName>('JEE_MAIN')
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState<ReservationCategory>('General')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const parsedRank = parseInt(rank, 10)
    if (isNaN(parsedRank) || parsedRank <= 0) {
      setError('Please enter a valid rank greater than 0.')
      return
    }

    onSubmit(examName, parsedRank, category)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Exam Select */}
        <Select
          label="Select Entrance Exam"
          value={examName}
          onChange={(e) => setExamName(e.target.value as ExamName)}
          options={EXAMS}
        />

        {/* Category Select */}
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ReservationCategory)}
          options={CATEGORIES}
        />

        {/* Rank Input */}
        <Input
          label="Enter Your Rank / Score"
          type="number"
          placeholder="e.g. 5200"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          error={error}
          required
          min={1}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full md:w-auto px-8 py-3 rounded-xl font-bold cursor-pointer"
        >
          Predict Colleges
        </Button>
      </div>
    </form>
  )
}
