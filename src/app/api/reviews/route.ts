import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { reviewSchema } from '@/lib/validations'
import { z } from 'zod'

const createReviewSchema = reviewSchema.extend({
  collegeId: z.string().min(1, 'College ID is required'),
})

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to write a review' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const result = createReviewSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: result.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { collegeId, rating, title, comment } = result.data

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

    // Check if user already reviewed this college
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        collegeId,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'Conflict', message: 'You have already reviewed this college' },
        { status: 409 }
      )
    }

    // Create review and update college rating in a transaction
    const review = await prisma.$transaction(async (tx) => {
      const newReview = await tx.review.create({
        data: {
          rating,
          title,
          comment,
          userId: session.user.id,
          collegeId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      // Recalculate average rating from all reviews
      const aggregation = await tx.review.aggregate({
        where: { collegeId },
        _avg: { rating: true },
      })

      const averageRating = aggregation._avg.rating ?? 0

      await tx.college.update({
        where: { id: collegeId },
        data: { rating: Math.round(averageRating * 10) / 10 },
      })

      return newReview
    })

    return NextResponse.json(
      { data: review, message: 'Review created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create review' },
      { status: 500 }
    )
  }
}
