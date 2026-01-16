import { getBlogPosts, getBlogCategories } from '@/lib/cosmic'
import Link from 'next/link'
import { BlogPost, BlogCategory } from '@/types'

export const revalidate = 60

export default async function BlogPage() {
  const [postsResponse, categories] = await Promise.all([
    getBlogPosts(1, 12),
    getBlogCategories(),
  ])

  const { items: posts } = postsResponse

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-olive-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Blog</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover tips, techniques, and inspiration for your Pilates journey
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-8 border-b border-cream-200 bg-white">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full bg-olive-800 text-white text-sm font-medium"
              >
                All Posts
              </Link>
              {categories.map((category: BlogCategory) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="px-4 py-2 rounded-full bg-cream-100 text-gray-700 hover:bg-olive-100 text-sm font-medium transition-colors"
                >
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts found.</p>
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