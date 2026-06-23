// =============================================================================
// College Discovery Platform - Frontend TypeScript Types
// =============================================================================
// These types mirror the Prisma models for use on the client side, and also
// define request/response shapes for API routes, filters, predictor, and auth.
// =============================================================================

// ---------------------------------------------------------------------------
// Core Entity Types
// ---------------------------------------------------------------------------

/** Frontend representation of a College entity */
export interface College {
  id: string
  name: string
  slug: string
  description: string
  city: string
  state: string
  type: CollegeType
  established: number
  rating: number
  imageUrl: string | null
  website: string | null
  minFees: number
  maxFees: number
  createdAt: string
  courses?: Course[]
  placements?: Placement[]
  reviews?: ReviewWithUser[]
  _count?: {
    reviews: number
    savedBy: number
    courses: number
  }
}

/** Frontend representation of a Course entity */
export interface Course {
  id: string
  collegeId: string
  name: string
  degree: DegreeType
  duration: string
  fees: number
  specialization: string | null
}

/** Frontend representation of a Placement entity */
export interface Placement {
  id: string
  collegeId: string
  year: number
  avgPackage: number
  highestPackage: number
  medianPackage: number
  placementRate: number
  topRecruiters: string // JSON array as string
}

/** Parsed placement data with recruiters as an actual array */
export interface PlacementParsed extends Omit<Placement, 'topRecruiters'> {
  topRecruiters: string[]
}

/** Frontend representation of a Review entity */
export interface Review {
  id: string
  collegeId: string
  userId: string
  rating: number
  title: string
  comment: string
  createdAt: string
}

/** Review with embedded user info for display */
export interface ReviewWithUser extends Review {
  user: {
    id: string
    name: string
  }
}

/** Frontend representation of a User entity (public-safe fields) */
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

/** Frontend representation of a SavedCollege entry */
export interface SavedCollege {
  id: string
  userId: string
  collegeId: string
  createdAt: string
  college?: College
}

/** Frontend representation of a PredictorRule entity */
export interface PredictorRule {
  id: string
  collegeId: string
  examName: ExamName
  minRank: number
  maxRank: number
  category: ReservationCategory
  college?: College
}

// ---------------------------------------------------------------------------
// Enum / Union Types
// ---------------------------------------------------------------------------

/** Supported college types */
export type CollegeType = 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'State' | 'Deemed'

/** Supported degree types */
export type DegreeType =
  | 'B.Tech'
  | 'M.Tech'
  | 'MBA'
  | 'B.Sc'
  | 'M.Sc'
  | 'BBA'
  | 'B.Arch'
  | 'M.Arch'
  | 'Ph.D'
  | 'BCA'
  | 'MCA'
  | 'B.Des'
  | 'M.Des'

/** Supported entrance exam names */
export type ExamName = 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'CAT' | 'GATE'

/** Reservation categories */
export type ReservationCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS'

/** Sort options for college listing */
export type CollegeSortBy =
  | 'rating'
  | 'name'
  | 'established'
  | 'minFees'
  | 'maxFees'

/** Sort direction */
export type SortOrder = 'asc' | 'desc'

// ---------------------------------------------------------------------------
// API Request / Response Types
// ---------------------------------------------------------------------------

/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/** Paginated response metadata */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/** Paginated list of colleges */
export interface CollegeListResponse {
  colleges: College[]
  pagination: PaginationMeta
}

/** Filters for the college listing / search page */
export interface CollegeFilters {
  search?: string
  state?: string
  type?: CollegeType | CollegeType[]
  minFees?: number
  maxFees?: number
  minRating?: number
  degree?: DegreeType
  sortBy?: CollegeSortBy
  sortOrder?: SortOrder
  page?: number
  limit?: number
}

// ---------------------------------------------------------------------------
// College Predictor Types
// ---------------------------------------------------------------------------

/** Input to the college predictor tool */
export interface PredictorInput {
  examName: ExamName
  rank: number
  category: ReservationCategory
}

/** Single result from the predictor */
export interface PredictorResult {
  college: College
  minRank: number
  maxRank: number
  chance: 'High' | 'Medium' | 'Low'
}

/** Full predictor response */
export interface PredictorResponse {
  input: PredictorInput
  results: PredictorResult[]
  totalMatches: number
}

// ---------------------------------------------------------------------------
// Compare Types
// ---------------------------------------------------------------------------

/** Request body for comparing colleges */
export interface CompareRequest {
  collegeIds: string[] // Array of 2–3 college IDs
}

/** Comparison response with full college details side-by-side */
export interface CompareResponse {
  colleges: College[] // Includes courses, placements, reviews
}

// ---------------------------------------------------------------------------
// Review Types
// ---------------------------------------------------------------------------

/** Request body for creating a new review */
export interface CreateReviewInput {
  collegeId: string
  rating: number
  title: string
  comment: string
}

// ---------------------------------------------------------------------------
// Auth Types
// ---------------------------------------------------------------------------

/** Authenticated user session data */
export interface AuthUser {
  id: string
  name: string
  email: string
}

/** Login request body */
export interface LoginInput {
  email: string
  password: string
}

/** Signup request body */
export interface SignupInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

/** Auth response after successful login/signup */
export interface AuthResponse {
  user: AuthUser
  token?: string
}

// ---------------------------------------------------------------------------
// Dashboard / Stats Types
// ---------------------------------------------------------------------------

/** Overview stats displayed on the home page or dashboard */
export interface PlatformStats {
  totalColleges: number
  totalCourses: number
  totalReviews: number
  averageRating: number
  statesCount: number
}

/** College card data (lightweight version for listing) */
export interface CollegeCard {
  id: string
  name: string
  slug: string
  city: string
  state: string
  type: CollegeType
  rating: number
  imageUrl: string | null
  minFees: number
  maxFees: number
  _count?: {
    reviews: number
    courses: number
  }
}
