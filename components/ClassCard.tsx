import Link from 'next/link'
import { PilatesClass } from '@/types'

interface ClassCardProps {
  classItem: PilatesClass
}

export default function ClassCard({ classItem }: ClassCardProps) {
  const { title, slug, metadata } = classItem
  const category = metadata.category?.value || 'General'
  const difficulty = metadata.difficulty_level?.value || 'All Levels'
  const price = metadata.price || 0
  const isFree = metadata.access_type?.key === 'free' || price === 0
  
  return (
    <Link href={`/classes/${slug}`} className="group">
      <article className="card h-full">
        <div className="relative overflow-hidden">
          <img
            src={`${metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {metadata.access_type?.key === 'premium' && (
            <span className="absolute top-4 right-4 badge-premium">
              Premium
            </span>
          )}
          {metadata.access_type?.key === 'free' && (
            <span className="absolute top-4 right-4 badge-free">
              Free
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{category}</span>
            <span>•</span>
            <span>{difficulty}</span>
          </div>
          <h3 className="font-serif text-xl text-gray-900 mb-3 group-hover:text-olive-800 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{metadata.duration} min</span>
            <div className="flex items-center gap-3">
              {isFree ? (
                <span className="text-olive-800 font-semibold">Free</span>
              ) : (
                <span className="text-olive-800 font-semibold">${price.toFixed(2)}</span>
              )}
              <span className="inline-flex items-center gap-1 text-olive-800 font-medium group-hover:gap-2 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}