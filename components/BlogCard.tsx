import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const { title, slug, metadata } = post
  const publishDate = metadata?.publish_date 
    ? new Date(metadata.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : ''
  
  const readingTime = metadata?.reading_time || 5
  const categoryName = metadata?.category?.metadata?.name || 'General'
  const categorySlug = metadata?.category?.slug
  const authorName = metadata?.author?.metadata?.name || 'Studio Team'
  const authorSlug = metadata?.author?.slug
  const authorPhoto = metadata?.author?.metadata?.photo?.imgix_url
  
  if (featured) {
    return (
      <article className="group relative">
        <Link href={`/blog/${slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={`${metadata?.featured_image?.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={metadata?.title || title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {categorySlug && (
                <span className="inline-block px-3 py-1 bg-olive-800 text-white text-xs font-medium rounded-full mb-4">
                  {categoryName}
                </span>
              )}
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 group-hover:text-cream-100 transition-colors">
                {metadata?.title || title}
              </h2>
              <p className="text-white/80 text-lg mb-4 line-clamp-2">
                {metadata?.excerpt}
              </p>
              <div className="flex items-center gap-4">
                {authorPhoto && (
                  <img
                    src={`${authorPhoto}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="text-white/90 text-sm">
                  <span className="font-medium">{authorName}</span>
                  <span className="mx-2">·</span>
                  <span>{publishDate}</span>
                  <span className="mx-2">·</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }
  
  return (
    <article className="group h-full">
      <Link href={`/blog/${slug}`} className="block h-full">
        <div className="card h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={`${metadata?.featured_image?.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={metadata?.title || title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {categorySlug && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-olive-800 text-xs font-medium rounded-full">
                {categoryName}
              </span>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{publishDate}</span>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-3 group-hover:text-olive-800 transition-colors line-clamp-2">
              {metadata?.title || title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
              {metadata?.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              {authorPhoto && (
                <img
                  src={`${authorPhoto}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={authorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-600">{authorName}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}