import { notFound } from 'next/navigation' // Actually notFound from next/navigation
import { prisma } from '@/lib/prisma'
import { CollegeDetailClient } from './CollegeDetailClient'
import { auth } from '@/lib/auth'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()

  // Find college by slug or id
  const college = await prisma.college.findFirst({
    where: {
      OR: [
        { slug: id },
        { id: id }
      ]
    },
    include: {
      courses: true,
      placements: {
        orderBy: { year: 'desc' }
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          reviews: true,
          savedBy: true,
          courses: true
        }
      }
    }
  })

  if (!college) {
    notFound()
  }

  // Check if saved by the logged-in user
  let isSaved = false
  if (session?.user?.id) {
    const saved = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId: college.id
        }
      }
    })
    isSaved = !!saved
  }

  // Format dates to strings for client components
  const formattedCollege = {
    ...college,
    createdAt: college.createdAt.toISOString(),
    reviews: college.reviews.map(r => ({
      ...r,
      createdAt: r.createdAt.toISOString()
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CollegeDetailClient college={formattedCollege as any} initialSaved={isSaved} />
    </div>
  )
}
