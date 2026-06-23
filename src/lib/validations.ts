// =============================================================================
// College Discovery Platform - Zod Validation Schemas
// =============================================================================
// Provides runtime validation for all user inputs including auth forms,
// college filters, reviews, predictor inputs, and comparison requests.
// =============================================================================

import { z } from 'zod'

// ---------------------------------------------------------------------------
// Auth Validation Schemas
// ---------------------------------------------------------------------------

/** Login form validation */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

/** Signup form validation */
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be less than 128 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupSchema>

// ---------------------------------------------------------------------------
// College Filters Validation
// ---------------------------------------------------------------------------

/** Supported college type values */
export const collegeTypeEnum = z.enum([
  'IIT',
  'NIT',
  'IIIT',
  'Private',
  'State',
  'Deemed',
])

/** Sort-by field options */
export const sortByEnum = z.enum([
  'rating',
  'name',
  'established',
  'minFees',
  'maxFees',
])

/** Sort order options */
export const sortOrderEnum = z.enum(['asc', 'desc'])

/** College listing filters & pagination */
export const collegeFiltersSchema = z.object({
  search: z
    .string()
    .max(200, 'Search query is too long')
    .optional()
    .or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  type: z
    .union([collegeTypeEnum, z.array(collegeTypeEnum)])
    .optional(),
  minFees: z
    .number()
    .int()
    .min(0, 'Minimum fees cannot be negative')
    .optional()
    .or(
      z
        .string()
        .transform((val) => (val === '' ? undefined : parseInt(val, 10)))
        .pipe(z.number().int().min(0).optional())
    ),
  maxFees: z
    .number()
    .int()
    .min(0, 'Maximum fees cannot be negative')
    .optional()
    .or(
      z
        .string()
        .transform((val) => (val === '' ? undefined : parseInt(val, 10)))
        .pipe(z.number().int().min(0).optional())
    ),
  minRating: z
    .number()
    .min(0)
    .max(5)
    .optional(),
  degree: z.string().optional(),
  sortBy: sortByEnum.optional().default('rating'),
  sortOrder: sortOrderEnum.optional().default('desc'),
  page: z
    .number()
    .int()
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1)
    .or(
      z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1))
    ),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(50, 'Limit cannot exceed 50')
    .optional()
    .default(12)
    .or(
      z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1).max(50))
    ),
})

export type CollegeFiltersFormData = z.infer<typeof collegeFiltersSchema>

// ---------------------------------------------------------------------------
// Review Validation
// ---------------------------------------------------------------------------

/** Review submission form */
export const reviewSchema = z.object({
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  comment: z
    .string()
    .min(1, 'Comment is required')
    .min(20, 'Comment must be at least 20 characters')
    .max(5000, 'Comment must be less than 5000 characters'),
})

export type ReviewFormData = z.infer<typeof reviewSchema>

// ---------------------------------------------------------------------------
// Predictor Validation
// ---------------------------------------------------------------------------

/** Supported exam name enum */
export const examNameEnum = z.enum([
  'JEE_MAIN',
  'JEE_ADVANCED',
  'NEET',
  'CAT',
  'GATE',
])

/** Reservation category enum */
export const categoryEnum = z.enum([
  'General',
  'OBC',
  'SC',
  'ST',
  'EWS',
])

/** College predictor input form */
export const predictorSchema = z.object({
  examName: examNameEnum,
  rank: z
    .number()
    .int('Rank must be a whole number')
    .positive('Rank must be a positive number')
    .max(1000000, 'Rank seems too high, please check'),
  category: categoryEnum.default('General'),
})

export type PredictorFormData = z.infer<typeof predictorSchema>

// ---------------------------------------------------------------------------
// Compare Validation
// ---------------------------------------------------------------------------

/** College comparison request - requires 2 to 3 college IDs */
export const compareSchema = z.object({
  collegeIds: z
    .array(z.string().min(1, 'College ID cannot be empty'))
    .min(2, 'Please select at least 2 colleges to compare')
    .max(3, 'You can compare up to 3 colleges at a time'),
})

export type CompareFormData = z.infer<typeof compareSchema>

// ---------------------------------------------------------------------------
// Contact / Feedback (bonus)
// ---------------------------------------------------------------------------

/** Contact form validation */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
})

export type ContactFormData = z.infer<typeof contactSchema>
