import Link from 'next/link'
import { BlogCategory, BlogTag } from '@/types'

interface BlogSidebarProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  currentCategorySlug?: string
  currentTagSlug?: string
}

export default function BlogSidebar({ 
  categories, 
  tags, 
  currentCategorySlug,
  currentTagSlug 
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-soft">
          <h3 className="font-serif text-xl text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog"
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  !currentCategorySlug
                    ? 'bg-olive-800 text-white'
                    : 'text-gray-600 hover:bg-cream-100 hover:text-olive-800'
                }`}
              >
                All Posts
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className={`block py-2 px-3 rounded-lg transition-colors ${
                    currentCategorySlug === category.slug
                      ? 'bg-olive-800 text-white'
                      : 'text-gray-600 hover:bg-cream-100 hover:text-olive-800'
                  }`}
                >
                  {category.metadata?.name || category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-soft">
          <h3 className="font-serif text-xl text-gray-900 mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  currentTagSlug === tag.slug
                    ? 'bg-olive-800 text-white'
                    : 'bg-cream-100 text-gray-600 hover:bg-olive-100 hover:text-olive-800'
                }`}
              >
                {tag.metadata?.name || tag.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Newsletter CTA */}
      <div className="bg-olive-800 rounded-xl p-6 text-white">
        <h3 className="font-serif text-xl mb-3">Stay Updated</h3>
        <p className="text-white/80 text-sm mb-4">
          Subscribe to our newsletter for wellness tips, studio updates, and exclusive content.
        </p>
        <Link
          href="/#newsletter"
          className="block w-full text-center py-2.5 bg-white text-olive-800 rounded-lg font-medium hover:bg-cream-100 transition-colors"
        >
          Subscribe Now
        </Link>
      </div>
    </aside>
  )
}