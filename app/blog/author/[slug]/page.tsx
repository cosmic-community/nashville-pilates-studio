// app/blog/author/[slug]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  getBlogAuthorBySlug, 
  getBlogPostsByAuthor, 
  getBlogAuthors 
} from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'

export const revalidate = 60

interface AuthorPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const authors = await getBlogAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getBlogAuthorBySlug(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found - Aligna Pilates Studio',
    }
  }
  
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const photo = author.metadata?.photo?.imgix_url
    ? `${author.metadata.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
    : undefined
  
  return {
    title: `${name} - Author | Aligna Pilates Studio Blog`,
    description: bio || `Read articles by ${name} on Aligna Pilates Studio Blog`,
    openGraph: {
      title: `${name} - Author`,
      description: bio || `Read articles by ${name}`,
      type: 'profile',
      images: photo ? [{ url: photo, width: 400, height: 400 }] : undefined,
    },
  }
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1
  
  const author = await getBlogAuthorBySlug(slug)
  
  if (!author) {
    notFound()
  }
  
  const postsData = await getBlogPostsByAuthor(author.id, page)
  const { items: posts, totalPages, total } = postsData
  
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const role = author.metadata?.role
  const photo = author.metadata?.photo?.imgix_url
  const instagram = author.metadata?.instagram
  const twitter = author.metadata?.twitter
  const linkedin = author.metadata?.linkedin
  
  return (
    <>
      {/* Author Profile Hero */}
      <section className="py-20 bg-cream-100">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-olive-800 hover:text-olive-700 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {photo && (
              <img
                src={`${photo}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={name}
                className="w-40 h-40 rounded-full object-cover shadow-medium"
              />
            )}
            <div className="text-center md:text-left flex-1">
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-2">
                {name}
              </h1>
              {role && (
                <p className="text-olive-800 font-medium text-lg mb-4">{role}</p>
              )}
              {bio && (
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-6">
                  {bio}
                </p>
              )}
              
              {/* Social Links */}
              {(instagram || twitter || linkedin) && (
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft text-gray-600 hover:text-olive-800 hover:shadow-medium transition-all"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft text-gray-600 hover:text-olive-800 hover:shadow-medium transition-all"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft text-gray-600 hover:text-olive-800 hover:shadow-medium transition-all"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
              
              <p className="text-gray-500 mt-6">
                {total} {total === 1 ? 'article' : 'articles'} published
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Author's Posts */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          <h2 className="font-serif text-3xl text-gray-900 mb-8">
            Articles by {name}
          </h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles published yet.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    basePath={`/blog/author/${slug}`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}