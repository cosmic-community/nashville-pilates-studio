// app/blog/category/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
  getBlogCategoryBySlug, 
  getBlogPostsByCategory, 
  getBlogCategories, 
  getBlogTags 
} from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'
import BlogSidebar from '@/components/BlogSidebar'
import Pagination from '@/components/Pagination'

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const categories = await getBlogCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getBlogCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Aligna Pilates Studio',
    }
  }
  
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || `Browse all ${name} articles from Aligna Pilates Studio`
  
  return {
    title: `${name} - Blog | Aligna Pilates Studio`,
    description,
    openGraph: {
      title: `${name} - Blog`,
      description,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1
  
  const category = await getBlogCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const [postsData, categories, tags] = await Promise.all([
    getBlogPostsByCategory(category.id, page),
    getBlogCategories(),
    getBlogTags(),
  ])
  
  const { items: posts, totalPages } = postsData
  const categoryName = category.metadata?.name || category.title
  const categoryDescription = category.metadata?.description
  
  return (
    <>
      {/* Hero Banner */}
      <section className="py-20 bg-olive-800 text-white">
        <div className="container-custom text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-4">Category</p>
          <h1 className="font-serif text-4xl md:text-5xl italic mb-4">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          )}
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
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
                      basePath={`/blog/category/${slug}`}
                    />
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar 
                  categories={categories} 
                  tags={tags}
                  currentCategorySlug={slug}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}