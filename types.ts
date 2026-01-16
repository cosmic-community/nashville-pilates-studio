export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings'
  metadata: {
    hero_headline: string
    hero_subheadline?: string
    hero_image: CosmicFile
    philosophy_quote?: string
    phone_number?: string
    promo_headline?: string
    promo_offer?: string
  }
}

export interface Instructor extends CosmicObject {
  type: 'instructors'
  metadata: {
    name: string
    photo: CosmicFile
    bio: string
    specialties?: string
  }
}

export interface DifficultyLevel {
  key: 'beginner' | 'intermediate' | 'advanced'
  value: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface CategoryType {
  key: 'mobility' | 'strength' | 'relaxation' | 'prenatal' | 'rehabilitation' | 'group'
  value: 'Mobility' | 'Strength' | 'Relaxation' | 'Prenatal' | 'Rehabilitation' | 'Group Classes'
}

export interface AccessType {
  key: 'free' | 'premium'
  value: 'Free' | 'Premium'
}

export interface PilatesClass extends CosmicObject {
  type: 'classes'
  metadata: {
    description: string
    featured_image: CosmicFile
    video_url?: string
    duration: number
    difficulty_level: DifficultyLevel
    category: CategoryType
    access_type: AccessType
    instructor?: Instructor
    price?: number
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}

// Cart types
export interface CartItem {
  id: string
  slug: string
  title: string
  price: number
  image: string
  duration: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

// Order types for tracking purchases
export interface Order extends CosmicObject {
  type: 'orders'
  metadata: {
    stripe_session_id: string
    customer_email: string
    total_amount: number
    status: 'pending' | 'completed' | 'cancelled'
    items: string // JSON string of cart items
    created_date: string
  }
}