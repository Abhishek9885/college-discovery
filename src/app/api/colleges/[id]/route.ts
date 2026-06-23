import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Bad request', message: 'College ID or slug is required' },
        { status: 400 }
      )
    }

    // Try to find by slug first, then by id
    const college = await prisma.college.findFirst({
      where: {
        OR: [
          { slug: id },
          { id: id },
        ],
      },
      include: {
        courses: true,
        placements: {
          orderBy: { year: 'desc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
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

    if (!college) {
      return NextResponse.json(
        { error: 'Not found', message: 'College not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: college })
  } catch (error) {
    console.error('College detail error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch college details' },
      { status: 500 }
    )
  }
}
