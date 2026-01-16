import { createBucketClient } from '@cosmicjs/sdk'
import { SiteSettings, Instructor, PilatesClass } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'site-settings', slug: 'site-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as SiteSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch site settings')
  }
}

export async function getClasses(): Promise<PilatesClass[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'classes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as PilatesClass[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch classes')
  }
}

export async function getClassBySlug(slug: string): Promise<PilatesClass | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'classes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as PilatesClass
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch class')
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'instructors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Instructor[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch instructors')
  }
}

export async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'instructors', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Instructor
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch instructor')
  }
}