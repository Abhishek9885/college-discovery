'use client'

import { useState } from 'react'
import PredictorForm from '@/components/predictor/PredictorForm'
import PredictorResults from '@/components/predictor/PredictorResults'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { ExamName, ReservationCategory } from '@/types'

interface PredictorResultItem {
  college: any
  minRank: number
  maxRank: number
  chance: 'High' | 'Medium' | 'Low'
}

export default function CollegePredictorPage() {
  const [results, setResults] = useState<PredictorResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [rankInput, setRankInput] = useState(0)

  const handlePredict = async (examName: ExamName, rank: number, category: ReservationCategory) => {
    setLoading(true)
    setHasSearched(true)
    setRankInput(rank)
    
    try {
      const res = await fetch('/api/predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examName,
          rank,
          category
        })
      })
      const data = await res.json()
      if (data.data) {
        const mappedResults = data.data.map((item: any) => {
          const rule = item.predictorRule
          const minRank = rule.minRank
          const maxRank = rule.maxRank
          
          let chance: 'High' | 'Medium' | 'Low' = 'Medium'
          const range = maxRank - minRank
          if (range > 0) {
            const relativePos = (maxRank - rank) / range
            if (relativePos >= 0.6) {
              chance = 'High'
            } else if (relativePos >= 0.2) {
              chance = 'Medium'
            } else {
              chance = 'Low'
            }
          }
          
          return {
            college: item.college,
            minRank,
            maxRank,
            chance
          }
        })
        setResults(mappedResults)
      } else {
        setResults([])
      }
    } catch (e) {
      console.error('Prediction failed', e)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">College Predictor</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Predict your admission chances based on your entrance exam rank/score and reservation category.
        </p>
      </div>

      {/* Input Form Card */}
      <Card className="p-6 md:p-8">
        <PredictorForm onSubmit={handlePredict} loading={loading} />
      </Card>

      {/* Results Section */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--text-secondary)] font-medium">Crunching cutoff ranks and historical rules...</p>
        </div>
      ) : hasSearched && results.length === 0 ? (
        <EmptyState
          title="No recommendations found"
          description={`We couldn't find any colleges matching your rank of ${rankInput.toLocaleString()} for the selected criteria. Try checking your inputs or category.`}
        />
      ) : hasSearched ? (
        <PredictorResults results={results} rankInput={rankInput} />
      ) : (
        <Card className="p-8 text-center bg-gradient-to-br from-primary-500/5 to-violet-500/5 border border-primary-500/10 rounded-2xl">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-bold text-[var(--text-primary)]">How it works</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              We compare your rank against historical opening and closing ranks (cutoffs) for IITs, NITs, and other universities to estimate your admission likelihood.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
