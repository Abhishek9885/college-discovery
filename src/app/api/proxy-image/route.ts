import { NextRequest } from 'next/server'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

// Standard retry function with exponential backoff and jitter
async function fetchWithRetry(url: string, headers: Record<string, string>, retries = 5, initialDelay = 300): Promise<Response> {
  let delay = initialDelay
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { headers })
      if (response.status === 429) {
        // 429 Rate Limit: wait and retry
        console.warn(`[Proxy Image] 429 Too Many Requests for ${url}. Retrying attempt ${i + 1}/${retries} after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 100))
        delay *= 2
        continue
      }
      return response
    } catch (error) {
      if (i === retries - 1) throw error
      console.warn(`[Proxy Image] Fetch error for ${url}. Retrying...`, error)
      await new Promise(resolve => setTimeout(resolve, delay))
      delay *= 2
    }
  }
  // Fallback fetch if loop ends
  return fetch(url, { headers })
}

export async function GET(request: NextRequest) {
  let filename = 'default'
  try {
    const { searchParams } = request.nextUrl
    const url = searchParams.get('url')

    if (!url) {
      return new Response('URL parameter is required', { status: 400 })
    }

    // Security: Only allow proxying from trusted domains (upload.wikimedia.org)
    if (!url.startsWith('https://upload.wikimedia.org/')) {
      return new Response('Forbidden URL domain', { status: 403 })
    }

    // Determine the file extension from the original URL
    let fileExtension = 'jpg'
    const origExtMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/)
    if (origExtMatch) {
      fileExtension = origExtMatch[1].toLowerCase()
    }

    // Cache directory path in public folder
    const cacheDir = path.join(process.cwd(), 'public', 'image-cache')
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    // EARLY CACHE CHECK: Check cache using the original URL hash first.
    // This matches how pre-cache-images.ts stores files (hashing the original URL).
    const origUrlHash = crypto.createHash('md5').update(url).digest('hex')
    const origCacheFilename = `${origUrlHash}.${fileExtension}`
    const origCacheFilePath = path.join(cacheDir, origCacheFilename)

    if (fs.existsSync(origCacheFilePath)) {
      const fileBuffer = fs.readFileSync(origCacheFilePath)
      let contentType = 'image/jpeg'
      if (fileExtension === 'png') contentType = 'image/png'
      else if (fileExtension === 'svg') contentType = 'image/svg+xml'
      else if (fileExtension === 'webp') contentType = 'image/webp'

      const headers = new Headers()
      headers.set('Content-Type', contentType)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')

      return new Response(fileBuffer, {
        status: 200,
        headers,
      })
    }

    // Self-correcting logic for Wikimedia Commons URLs
    let fetchUrl = url
    const match = url.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^\/]+)\/(\d+)px-([^\/]+)/)
    
    if (match) {
      filename = match[1]
      // Compute correct MD5 hash of the filename to fix any wrong folder prefixes
      const hash = crypto.createHash('md5').update(filename).digest('hex')
      const folder1 = hash[0]
      const folder2 = hash.slice(0, 2)
      
      // Use 960px standard size which is allowed and looks great on all views (banners and cards)
      const targetWidth = '960px'
      
      fetchUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${folder1}/${folder2}/${filename}/${targetWidth}-${match[3]}`
      
      // Get extension from filename
      const extMatch = filename.match(/\.([a-zA-Z0-9]+)$/)
      if (extMatch) {
        fileExtension = extMatch[1].toLowerCase()
      }
    } else {
      // If it doesn't match thumb pattern, try to get filename from URL path
      const urlPath = new URL(url).pathname
      const baseName = path.basename(urlPath)
      filename = baseName
      const extMatch = baseName.match(/\.([a-zA-Z0-9]+)$/)
      if (extMatch) {
        fileExtension = extMatch[1].toLowerCase()
      }
    }

    // File-based Cache logic (secondary check with self-corrected URL)
    // Generate a unique cache filename based on the final fetch URL
    const urlHash = crypto.createHash('md5').update(fetchUrl).digest('hex')
    const cacheFilename = `${urlHash}.${fileExtension}`
    const cacheFilePath = path.join(cacheDir, cacheFilename)

    // Check if the file is cached on disk
    if (fs.existsSync(cacheFilePath)) {
      // Serve directly from the file system
      const fileBuffer = fs.readFileSync(cacheFilePath)
      let contentType = 'image/jpeg'
      if (fileExtension === 'png') contentType = 'image/png'
      else if (fileExtension === 'svg') contentType = 'image/svg+xml'
      else if (fileExtension === 'webp') contentType = 'image/webp'
      
      const headers = new Headers()
      headers.set('Content-Type', contentType)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable') // Cache forever since hash is unique
      
      return new Response(fileBuffer, {
        status: 200,
        headers,
      })
    }

    // Fetch the image with robot policy compliant User-Agent
    const response = await fetchWithRetry(fetchUrl, {
      'User-Agent': 'CollegeDiscoveryBot/1.0 (abhishek.lpu.student@gmail.com; NextJS/16)',
    })

    if (!response.ok) {
      console.warn(`[Proxy Image] Failed to fetch from source: ${response.statusText} (${response.status}). Serving fallback.`)
      return serveFallbackImage(filename)
    }

    const contentType = response.headers.get('Content-Type') || `image/${fileExtension}`
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Save to cache asynchronously to not block the current request
    fs.promises.writeFile(cacheFilePath, buffer).catch(err => {
      console.error('[Proxy Image] Error saving image to disk cache:', err)
    })

    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')

    return new Response(buffer, {
      status: 200,
      headers,
    })
  } catch (error: any) {
    console.error('Image proxy error serving fallback:', error)
    return serveFallbackImage(filename)
  }
}

// Serves a local fallback image based on the filename to ensure cards/banners never show broken icons
function serveFallbackImage(filename: string): Response {
  try {
    const hash = crypto.createHash('md5').update(filename).digest('hex')
    const charCodeSum = hash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const imageNum = (charCodeSum % 3) + 1
    const fallbackPath = path.join(process.cwd(), 'public', 'images', `college-${imageNum}.png`)
    
    if (fs.existsSync(fallbackPath)) {
      const fileBuffer = fs.readFileSync(fallbackPath)
      const headers = new Headers()
      headers.set('Content-Type', 'image/png')
      headers.set('Cache-Control', 'public, max-age=3600') // shorter cache for fallback so it can recover
      return new Response(fileBuffer, {
        status: 200,
        headers,
      })
    }
  } catch (err) {
    console.error('[Proxy Image] Error serving fallback image:', err)
  }
  
  return new Response('Image not found', { status: 404 })
}
