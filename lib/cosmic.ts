import { createBucketClient } from '@cosmicjs/sdk'
import { 
  SiteSettings, 
  Instructor, 
  PilatesClass, 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogAuthor,
  PaginatedResponse 
} from '@/types'

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

// Blog Functions
const POSTS_PER_PAGE = 9

export async function getBlogPosts(
  page: number = 1,
  limit: number = POSTS_PER_PAGE
): Promise<PaginatedResponse<BlogPost>> {
  try {
    const skip = (page - 1) * limit
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
      .limit(limit)
      .skip(skip)
    
    // Sort by publish_date manually (newest first)
    const sortedObjects = (response.objects as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at).getTime()
      return dateB - dateA
    })
    
    const total = response.total || 0
    const totalPages = Math.ceil(total / limit)
    
    return {
      items: sortedObjects,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
    throw new Error('Failed to fetch blog posts')
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
    
    return response.object as BlogPost
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog post')
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as BlogCategory[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog categories')
  }
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as BlogCategory
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog category')
  }
}

export async function getBlogPostsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = POSTS_PER_PAGE
): Promise<PaginatedResponse<BlogPost>> {
  try {
    const skip = (page - 1) * limit
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
      .limit(limit)
      .skip(skip)
    
    const sortedObjects = (response.objects as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at).getTime()
      return dateB - dateA
    })
    
    const total = response.total || 0
    const totalPages = Math.ceil(total / limit)
    
    return {
      items: sortedObjects,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
    throw new Error('Failed to fetch posts by category')
  }
}

export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-tags' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as BlogTag[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog tags')
  }
}

export async function getBlogTagBySlug(slug: string): Promise<BlogTag | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-tags', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as BlogTag
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog tag')
  }
}

export async function getBlogPostsByTag(
  tagId: string,
  page: number = 1,
  limit: number = POSTS_PER_PAGE
): Promise<PaginatedResponse<BlogPost>> {
  try {
    const skip = (page - 1) * limit
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.tags': tagId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
      .limit(limit)
      .skip(skip)
    
    const sortedObjects = (response.objects as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at).getTime()
      return dateB - dateA
    })
    
    const total = response.total || 0
    const totalPages = Math.ceil(total / limit)
    
    return {
      items: sortedObjects,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
    throw new Error('Failed to fetch posts by tag')
  }
}

export async function getBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as BlogAuthor[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog authors')
  }
}

export async function getBlogAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-authors', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as BlogAuthor
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog author')
  }
}

export async function getBlogPostsByAuthor(
  authorId: string,
  page: number = 1,
  limit: number = POSTS_PER_PAGE
): Promise<PaginatedResponse<BlogPost>> {
  try {
    const skip = (page - 1) * limit
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
      .limit(limit)
      .skip(skip)
    
    const sortedObjects = (response.objects as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at).getTime()
      return dateB - dateA
    })
    
    const total = response.total || 0
    const totalPages = Math.ceil(total / limit)
    
    return {
      items: sortedObjects,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
    throw new Error('Failed to fetch posts by author')
  }
}

export async function getRelatedPosts(
  currentPostId: string,
  categoryId: string,
  limit: number = 3
): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)
      .limit(limit + 1)
    
    // Filter out current post and limit results
    const filteredPosts = (response.objects as BlogPost[])
      .filter(post => post.id !== currentPostId)
      .slice(0, limit)
    
    return filteredPosts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch related posts')
  }
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['slug'])
      .depth(0)
    
    return response.objects.map((post: { slug: string }) => post.slug)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog post slugs')
  }
}