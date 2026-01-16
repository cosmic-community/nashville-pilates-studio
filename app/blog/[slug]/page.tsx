// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogPostSlugs, getRelatedPosts } from '@/lib/cosmic'
import RelatedPosts from '@/components/RelatedPosts'
import ArticleJsonLd from '@/components/ArticleJsonLd'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Aligna Pilates Studio',
    }
  }
  
  const title = post.metadata?.seo_title || post.metadata?.title || post.title
  const description = post.metadata?.seo_description || post.metadata?.excerpt
  const image = post.metadata?.featured_image?.imgix_url
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined
  
  return {
    title: `${title} - Aligna Pilates Studio Blog`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.metadata?.publish_date,
      authors: post.metadata?.author?.metadata?.name ? [post.metadata.author.metadata.name] : undefined,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  const categoryId = post.metadata?.category?.id
  const relatedPosts = categoryId 
    ? await getRelatedPosts(post.id, categoryId, 3)
    : []
  
  const publishDate = post.metadata?.publish_date 
    ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : ''
  
  const readingTime = post.metadata?.reading_time || 5
  const categoryName = post.metadata?.category?.metadata?.name
  const categorySlug = post.metadata?.category?.slug
  const authorName = post.metadata?.author?.metadata?.name || 'Studio Team'
  const authorSlug = post.metadata?.author?.slug
  const authorPhoto = post.metadata?.author?.metadata?.photo?.imgix_url
  const authorBio = post.metadata?.author?.metadata?.bio
  const authorRole = post.metadata?.author?.metadata?.role
  const tags = post.metadata?.tags || []
  
  // Build current URL for JSON-LD
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aligna-pilates.com'
  const currentUrl = `${baseUrl}/blog/${slug}`
  
  return (
    <>
      <ArticleJsonLd post={post} url={currentUrl} />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={`${post.metadata?.featured_image?.imgix_url}?w=1920&h=900&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
        </div>
        <div className="relative z-10 container-custom pb-12">
          <div className="max-w-4xl">
            {categorySlug && categoryName && (
              <Link
                href={`/blog/category/${categorySlug}`}
                className="inline-block px-4 py-1.5 bg-olive-800 text-white text-sm font-medium rounded-full mb-4 hover:bg-olive-700 transition-colors"
              >
                {categoryName}
              </Link>
            )}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {post.metadata?.title || post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              {authorPhoto && (
                <img
                  src={`${authorPhoto}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-white">{authorName}</span>
              <span>·</span>
              <span>{publishDate}</span>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-olive-800 hover:text-olive-700 mb-8 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            {/* Excerpt */}
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                {post.metadata.excerpt}
              </p>
            )}
            
            {/* Main Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-olive-800 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
            />
            
            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className="px-4 py-2 bg-cream-100 text-gray-700 rounded-full text-sm hover:bg-olive-100 hover:text-olive-800 transition-colors"
                    >
                      {tag.metadata?.name || tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Author Box */}
            {authorSlug && (
              <div className="mt-12 p-8 bg-cream-100 rounded-2xl">
                <div className="flex items-start gap-6">
                  {authorPhoto && (
                    <Link href={`/blog/author/${authorSlug}`}>
                      <img
                        src={`${authorPhoto}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={authorName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </Link>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-olive-800 font-medium mb-1">Written by</p>
                    <Link 
                      href={`/blog/author/${authorSlug}`}
                      className="font-serif text-2xl text-gray-900 hover:text-olive-800 transition-colors"
                    >
                      {authorName}
                    </Link>
                    {authorRole && (
                      <p className="text-gray-500 text-sm mt-1">{authorRole}</p>
                    )}
                    {authorBio && (
                      <p className="text-gray-600 mt-3 line-clamp-3">{authorBio}</p>
                    )}
                    <Link
                      href={`/blog/author/${authorSlug}`}
                      className="inline-flex items-center gap-2 text-olive-800 font-medium mt-4 hover:gap-3 transition-all"
                    >
                      View all posts
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
      
      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </>
  )
}