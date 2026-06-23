import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    // Handle distinct states request
    const distinct = searchParams.get('distinct')
    if (distinct === 'states') {
      const states = await prisma.college.findMany({
        select: { state: true },
        distinct: ['state'],
        orderBy: { state: 'asc' },
      })
      return NextResponse.json({
        data: states.map((s) => s.state),
      })
    }

    // Parse query parameters
    const search = searchParams.get('search') ?? undefined
    const state = searchParams.get('state') ?? undefined
    const type = searchParams.get('type') ?? undefined
    const minFees = searchParams.get('minFees')
    const maxFees = searchParams.get('maxFees')
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10)))

    // Build dynamic where clause
    const where: Prisma.CollegeWhereInput = {}

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    if (state) {
      where.state = state
    }

    if (type) {
      where.type = type
    }

    if (minFees || maxFees) {
      if (minFees) {
        where.minFees = { gte: parseFloat(minFees) }
      }
      if (maxFees) {
        where.maxFees = { lte: parseFloat(maxFees) }
      }
    }

    const skip = (page - 1) * limit

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        include: {
          _count: {
            select: {
              reviews: true,
              savedBy: true,
              courses: true,
            },
          },
        },
        orderBy: { rating: 'desc' },
        skip,
        take: limit,
      }),
      prisma.college.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: {
        colleges,
        total,
        page,
        totalPages,
      },
    })
  } catch (error: any) {
    console.error('Colleges list error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message || 'Failed to fetch colleges',
        stack: error.stack
      },
      { status: 500 }
    )
  }
}
