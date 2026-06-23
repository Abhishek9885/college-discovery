import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { predictorSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = predictorSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: result.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { examName, rank, category } = result.data

    const predictorRules = await prisma.predictorRule.findMany({
      where: {
        examName,
        minRank: { lte: rank },
        maxRank: { gte: rank },
        category,
      },
      include: {
        college: {
          include: {
            _count: {
              select: {
                reviews: true,
                savedBy: true,
                courses: true,
              },
            },
          },
        },
      },
      orderBy: {
        college: { rating: 'desc' },
      },
    })

    const results = predictorRules.map((rule) => ({
      college: rule.college,
      predictorRule: {
        id: rule.id,
        examName: rule.examName,
        minRank: rule.minRank,
        maxRank: rule.maxRank,
        category: rule.category,
      },
    }))

    return NextResponse.json({
      data: results,
      message: `Found ${results.length} matching college(s)`,
    })
  } catch (error) {
    console.error('Predictor error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to predict colleges' },
      { status: 500 }
    )
  }
}
