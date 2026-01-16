import Link from 'next/link'
import { BlogPost } from '@/types'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null
  
  return (
    <section className="py-16 bg-cream-50">
      <div className="container-custom">
        <h2 className="font-serif text-3xl text-gray-900 mb-8 text-center">
          Related Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const publishDate = post.metadata?.publish_date 
              ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : ''
            
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={`${post.metadata?.featured_image?.imgix_url}?w=600&h=375&fit=crop&auto=format,compress`}
                      alt={post.metadata?.title || post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-2">{publishDate}</p>
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-olive-800 transition-colors line-clamp-2">
                      {post.metadata?.title || post.title}
                    </h3>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}