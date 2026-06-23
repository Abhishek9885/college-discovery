import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { compareSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = compareSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: result.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { collegeIds } = result.data

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: collegeIds },
      },
      include: {
        courses: true,
        placements: {
          orderBy: { year: 'desc' },
          take: 1,
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        _count: {
          select: {
            reviews: true,
            savedBy: true,
            courses: true,
          },
        },
      },
    })

    if (colleges.length !== collegeIds.length) {
      const foundIds = new Set(colleges.map((c) => c.id))
      const missingIds = collegeIds.filter((id) => !foundIds.has(id))
      return NextResponse.json(
        { error: 'Not found', message: `Colleges not found: ${missingIds.join(', ')}` },
        { status: 404 }
      )
    }

    // Preserve the order of the input collegeIds
    const orderedColleges = collegeIds.map((id) =>
      colleges.find((c) => c.id === id)
    )

    return NextResponse.json({ data: orderedColleges })
  } catch (error) {
    console.error('Compare colleges error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to compare colleges' },
      { status: 500 }
    )
  }
}
