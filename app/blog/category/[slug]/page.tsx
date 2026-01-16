// app/blog/category/[slug]/page.tsx
import { getBlogCategoryBySlug, getBlogPostsByCategory, getBlogCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogPost, BlogCategory } from '@/types'

export const revalidate = 60

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const [category, categories] = await Promise.all([
    getBlogCategoryBySlug(slug),
    getBlogCategories(),
  ])

  if (!category) {
    notFound()
  }

  const postsResponse = await getBlogPostsByCategory(category.id, 1, 12)
  const { items: posts } = postsResponse

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-olive-800 text-white py-20">
        <div className="container-custom text-center">
          <p className="text-white/60 mb-2">Category</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{category.metadata.name}</h1>
          {category.metadata.description && (
            <p className="text-white/80 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 border-b border-cream-200 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-cream-100 text-gray-700 hover:bg-olive-100 text-sm font-medium transition-colors"
            >
              All Posts
            </Link>
            {categories.map((cat: BlogCategory) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === slug
                    ? 'bg-olive-800 text-white'
                    : 'bg-cream-100 text-gray-700 hover:bg-olive-100'
                }`}
              >
                {cat.metadata.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found in this category.</p>
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