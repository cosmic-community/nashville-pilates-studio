// app/blog/tag/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
  getBlogTagBySlug, 
  getBlogPostsByTag, 
  getBlogCategories, 
  getBlogTags 
} from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'
import BlogSidebar from '@/components/BlogSidebar'
import Pagination from '@/components/Pagination'

export const revalidate = 60

interface TagPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const tags = await getBlogTags()
  return tags.map((tag) => ({ slug: tag.slug }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getBlogTagBySlug(slug)
  
  if (!tag) {
    return {
      title: 'Tag Not Found - Aligna Pilates Studio',
    }
  }
  
  const name = tag.metadata?.name || tag.title
  
  return {
    title: `Posts tagged "${name}" - Blog | Aligna Pilates Studio`,
    description: `Browse all articles tagged with "${name}" from Aligna Pilates Studio`,
    openGraph: {
      title: `Posts tagged "${name}" - Blog`,
      description: `Browse all articles tagged with "${name}"`,
      type: 'website',
    },
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1
  
  const tag = await getBlogTagBySlug(slug)
  
  if (!tag) {
    notFound()
  }
  
  const [postsData, categories, tags] = await Promise.all([
    getBlogPostsByTag(tag.id, page),
    getBlogCategories(),
    getBlogTags(),
  ])
  
  const { items: posts, totalPages } = postsData
  const tagName = tag.metadata?.name || tag.title
  
  return (
    <>
      {/* Hero Banner */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-4">Tag</p>
          <h1 className="font-serif text-4xl md:text-5xl italic mb-4">
            #{tagName}
          </h1>
          <p className="text-lg text-white/80">
            {postsData.total} {postsData.total === 1 ? 'article' : 'articles'} with this tag
          </p>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found with this tag.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      basePath={`/blog/tag/${slug}`}
                    />
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar 
                  categories={categories} 
                  tags={tags}
                  currentTagSlug={slug}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}