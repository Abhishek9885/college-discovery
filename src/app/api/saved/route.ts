import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const saveCollegeSchema = z.object({
  collegeId: z.string().min(1, 'College ID is required'),
})

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to view saved colleges' },
        { status: 401 }
      )
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
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
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      data: savedColleges,
    })
  } catch (error) {
    console.error('Get saved colleges error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch saved colleges' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to save colleges' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const result = saveCollegeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: result.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { collegeId } = result.data

    // Verify college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    })

    if (!college) {
      return NextResponse.json(
        { error: 'Not found', message: 'College not found' },
        { status: 404 }
      )
    }

    // Check if already saved
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Conflict', message: 'College is already saved' },
        { status: 409 }
      )
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
      include: {
        college: true,
      },
    })

    return NextResponse.json(
      { data: savedCollege, message: 'College saved successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Save college error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to save college' },
      { status: 500 }
    )
  }
}
