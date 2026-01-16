// app/blog/tag/[slug]/page.tsx
import { getBlogTagBySlug, getBlogPostsByTag } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogPost } from '@/types'

export const revalidate = 60

export default async function TagPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const tag = await getBlogTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const postsResponse = await getBlogPostsByTag(tag.id, 1, 12)
  const { items: posts } = postsResponse

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-olive-800 text-white py-20">
        <div className="container-custom text-center">
          <p className="text-white/60 mb-2">Tag</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">#{tag.metadata.name}</h1>
          <p className="text-white/80">
            {postsResponse.total} {postsResponse.total === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found with this tag.</p>
              <Link href="/blog" className="text-olive-800 hover:underline mt-4 inline-block">
                View all posts
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Blog */}
      <div className="py-8 text-center">
        <Link href="/blog" className="text-olive-800 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-6">
        {post.metadata.category && (
          <Link
            href={`/blog/category/${post.metadata.category.slug}`}
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{ 
              backgroundColor: `${post.metadata.category.metadata?.color || '#6b7f67'}20`,
              color: post.metadata.category.metadata?.color || '#6b7f67'
            }}
          >
            {post.metadata.category.metadata?.name || post.metadata.category.title}
          </Link>
        )}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-serif text-xl text-gray-900 mb-2 hover:text-olive-800 transition-colors">
            {post.metadata.title || post.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.metadata.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formattedDate}</span>
          {post.metadata.reading_time && (
            <span>{post.metadata.reading_time} min read</span>
          )}
        </div>
      </div>
    </article>
  )
}