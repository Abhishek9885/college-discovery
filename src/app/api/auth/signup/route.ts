import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signupSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: result.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { name, email, password } = result.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered', message: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      { data: user, message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create account' },
      { status: 500 }
    )
  }
}
