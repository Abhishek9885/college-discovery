import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ collegeId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to unsave colleges' },
        { status: 401 }
      )
    }

    const { collegeId } = await params

    if (!collegeId) {
      return NextResponse.json(
        { error: 'Bad request', message: 'College ID is required' },
        { status: 400 }
      )
    }

    // Check if the saved record exists
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Not found', message: 'Saved college not found' },
        { status: 404 }
      )
    }

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    })

    return NextResponse.json({
      message: 'College unsaved successfully',
    })
  } catch (error) {
    console.error('Unsave college error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to unsave college' },
      { status: 500 }
    )
  }
}
