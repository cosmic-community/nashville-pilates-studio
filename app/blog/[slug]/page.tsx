// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPostSlugs } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogPost } from '@/types'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post.metadata.category 
    ? await getRelatedPosts(post.id, post.metadata.category.id, 3)
    : []

  const formattedDate = new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            {post.metadata.category && (
              <Link
                href={`/blog/category/${post.metadata.category.slug}`}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-white/20 text-white backdrop-blur-sm"
              >
                {post.metadata.category.metadata?.name || post.metadata.category.title}
              </Link>
            )}
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-4 max-w-4xl">
              {post.metadata.title || post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <span>{formattedDate}</span>
              {post.metadata.reading_time && (
                <>
                  <span>•</span>
                  <span>{post.metadata.reading_time} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Author */}
            {post.metadata.author && (
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-cream-200">
                <img
                  src={`${post.metadata.author.metadata?.photo?.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <Link 
                    href={`/blog/author/${post.metadata.author.slug}`}
                    className="font-medium text-gray-900 hover:text-olive-800 transition-colors"
                  >
                    {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </Link>
                  {post.metadata.author.metadata?.role && (
                    <p className="text-sm text-gray-600">{post.metadata.author.metadata.role}</p>
                  )}
                </div>
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-olive max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-cream-200">
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className="px-3 py-1 rounded-full bg-cream-100 text-gray-700 hover:bg-olive-100 text-sm transition-colors"
                    >
                      #{tag.metadata?.name || tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-cream-200">
          <div className="container-custom">
            <h2 className="font-serif text-3xl text-center mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="py-8 text-center">
        <Link href="/blog" className="text-olive-800 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  )
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=600&h=375&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-serif text-lg text-gray-900 group-hover:text-olive-800 transition-colors">
          {post.metadata.title || post.title}
        </h3>
      </Link>
    </article>
  )
}