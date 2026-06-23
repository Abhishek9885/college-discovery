// =============================================================================
// Prisma Client Singleton
// =============================================================================
// Standard Next.js Prisma client singleton pattern.
// Prevents multiple PrismaClient instances during development hot-reloads
// by caching the client on the global object.
// In production, a single instance is created normally.
// =============================================================================

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
