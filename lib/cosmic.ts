import { createBucketClient } from '@cosmicjs/sdk'
import { SiteSettings, Instructor, PilatesClass, Order } from '@/types'

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

export async function createOrder(orderData: {
  stripe_session_id: string
  customer_email: string
  total_amount: number
  items: string
}): Promise<Order | null> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Order ${orderData.stripe_session_id.slice(-8)}`,
      type: 'orders',
      metadata: {
        stripe_session_id: orderData.stripe_session_id,
        customer_email: orderData.customer_email,
        total_amount: orderData.total_amount,
        status: 'completed',
        items: orderData.items,
        created_date: new Date().toISOString().split('T')[0],
      },
    })
    
    return response.object as Order
  } catch (error) {
    console.error('Failed to create order:', error)
    return null
  }
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'orders', 'metadata.stripe_session_id': sessionId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Order
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    return null
  }
}