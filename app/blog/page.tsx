import { Metadata } from 'next'
import { getBlogPosts, getBlogCategories, getBlogTags, getSiteSettings } from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'
import BlogSidebar from '@/components/BlogSidebar'
import Pagination from '@/components/Pagination'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog - Aligna Pilates Studio | Wellness, Movement & Mindfulness',
  description: 'Explore articles about Pilates, wellness, mindful movement, and healthy living. Expert tips and insights from our instructors.',
  openGraph: {
    title: 'Blog - Aligna Pilates Studio',
    description: 'Explore articles about Pilates, wellness, mindful movement, and healthy living.',
    type: 'website',
  },
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  
  const [postsData, categories, tags, settings] = await Promise.all([
    getBlogPosts(page),
    getBlogCategories(),
    getBlogTags(),
    getSiteSettings(),
  ])
  
  const heroImage = settings?.metadata?.hero_image?.imgix_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=600&fit=crop'
  const { items: posts, totalPages, hasNextPage, hasPrevPage } = postsData
  
  // Get featured post (first post on first page)
  const featuredPost = page === 1 && posts.length > 0 ? posts[0] : null
  const regularPosts = page === 1 && featuredPost ? posts.slice(1) : posts
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`${heroImage}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt="Our Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.2em] mb-4">Our Blog</p>
          <h1 className="font-serif text-5xl md:text-6xl italic mb-6">
            Wellness<br />Insights
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover articles about mindful movement, wellness tips, and the art of Pilates from our expert instructors.
          </p>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <BlogCard post={featuredPost} featured />
                </div>
              )}
              
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {regularPosts.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {regularPosts.map((post) => (
                          <BlogCard key={post.id} post={post} />
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-12">
                          <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            basePath="/blog"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No more posts to display.</p>
                    </div>
                  )}
                </div>
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <BlogSidebar categories={categories} tags={tags} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}