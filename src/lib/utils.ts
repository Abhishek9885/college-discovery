// =============================================================================
// College Discovery Platform - Utility Functions
// =============================================================================
// Shared helper functions used across the application for formatting,
// string manipulation, and display logic.
// =============================================================================

/**
 * Formats an amount in INR with the ₹ symbol and Indian number grouping.
 * Example: formatCurrency(120000) → "₹1,20,000"
 */
export function formatCurrency(amount: number): string {
  // Indian numbering: first group of 3, then groups of 2
  const str = Math.abs(Math.round(amount)).toString()
  if (str.length <= 3) {
    return `₹${amount < 0 ? '-' : ''}${str}`
  }

  // Last 3 digits
  const last3 = str.slice(-3)
  const remaining = str.slice(0, -3)

  // Group remaining digits in pairs from the right
  const pairs = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',')

  return `₹${amount < 0 ? '-' : ''}${pairs},${last3}`
}

/**
 * Formats a salary figure in LPA (Lakhs Per Annum).
 * Example: formatLPA(12.5) → "₹12.5 LPA"
 */
export function formatLPA(amount: number): string {
  // Round to 1 decimal place if fractional, show integer if whole
  const formatted = amount % 1 === 0 ? amount.toString() : amount.toFixed(1)
  return `₹${formatted} LPA`
}

/**
 * Joins class names, filtering out falsy values.
 * Useful for conditional Tailwind CSS class application.
 * Example: cn('base', isActive && 'active', undefined) → "base active"
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Extracts initials from a name (up to 2 characters).
 * Example: getInitials("Rahul Sharma") → "RS"
 * Example: getInitials("Priya") → "PR"
 */
export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return '?'

  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Converts a text string to a URL-friendly slug.
 * Example: slugify("IIT Bombay") → "iit-bombay"
 * Example: slugify("NIT Trichy (NITT)") → "nit-trichy-nitt"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')    // Remove non-word chars (except hyphens)
    .replace(/--+/g, '-')       // Collapse multiple hyphens
    .replace(/^-+/, '')         // Trim leading hyphens
    .replace(/-+$/, '')         // Trim trailing hyphens
}

/**
 * Returns a college image URL path, cycling through available images.
 * Images are numbered 1 through 3: /images/college-1.png, etc.
 * Example: getImageUrl(0) → "/images/college-1.png"
 * Example: getImageUrl(4) → "/images/college-2.png"
 */
export function getImageUrl(index: number): string {
  const imageNumber = (index % 3) + 1
  return `/images/college-${imageNumber}.png`
}

/**
 * Truncates text to the specified maxLength, adding an ellipsis if needed.
 * Does not cut in the middle of a word when possible.
 * Example: truncateText("This is a long description", 15) → "This is a long…"
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text

  // Try to break at a word boundary
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace) + '…'
  }
  return truncated + '…'
}

/**
 * Returns an array of star states for a rating value (0–5).
 * Each element is 'full', 'half', or 'empty'.
 * Example: getStarRating(3.5) → ['full', 'full', 'full', 'half', 'empty']
 * Example: getStarRating(4) → ['full', 'full', 'full', 'full', 'empty']
 */
export function getStarRating(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = []
  const clamped = Math.max(0, Math.min(5, rating))

  for (let i = 1; i <= 5; i++) {
    if (clamped >= i) {
      stars.push('full')
    } else if (clamped >= i - 0.5) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  return stars
}

/**
 * Formats a Date object or ISO string into a human-readable date.
 * Example: formatDate("2024-06-15T10:30:00Z") → "Jun 15, 2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Parses a JSON string of top recruiters into an array.
 * Returns an empty array if parsing fails.
 */
export function parseRecruiters(json: string): string[] {
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Returns a human-readable label for a college type.
 */
export function getCollegeTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    IIT: 'Indian Institute of Technology',
    NIT: 'National Institute of Technology',
    IIIT: 'Indian Institute of Information Technology',
    Private: 'Private University',
    State: 'State University',
    Deemed: 'Deemed University',
  }
  return labels[type] || type
}

/**
 * Returns a human-readable label for an exam name.
 */
export function getExamLabel(examName: string): string {
  const labels: Record<string, string> = {
    JEE_MAIN: 'JEE Main',
    JEE_ADVANCED: 'JEE Advanced',
    NEET: 'NEET',
    CAT: 'CAT',
    GATE: 'GATE',
  }
  return labels[examName] || examName
}

/**
 * Generates a list of unique Indian states from a set of colleges.
 */
export function getUniqueStates(colleges: { state: string }[]): string[] {
  return [...new Set(colleges.map((c) => c.state))].sort()
}

/**
 * Determines the chance level based on user rank and rule rank range.
 * Returns 'High' if rank is in lower third, 'Medium' if middle, 'Low' if upper third.
 */
export function calculateChance(
  rank: number,
  minRank: number,
  maxRank: number
): 'High' | 'Medium' | 'Low' {
  const range = maxRank - minRank
  const position = rank - minRank

  if (position <= range * 0.33) return 'High'
  if (position <= range * 0.66) return 'Medium'
  return 'Low'
}

/**
 * Returns a proxy URL for an image if it's external (e.g. upload.wikimedia.org)
 * to prevent hotlinking and CORS blocks.
 */
export function getProxyImageUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('https://upload.wikimedia.org/')) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`
  }
  return url
}
