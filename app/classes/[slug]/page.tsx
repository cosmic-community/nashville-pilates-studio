// app/classes/[slug]/page.tsx
import { getClassBySlug, getClasses } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AccessBadge from '@/components/AccessBadge'
import DifficultyBadge from '@/components/DifficultyBadge'

export const revalidate = 60

export async function generateStaticParams() {
  const classes = await getClasses()
  return classes.map((classItem) => ({
    slug: classItem.slug,
  }))
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const classItem = await getClassBySlug(slug)
  
  if (!classItem) {
    notFound()
  }
  
  const instructor = classItem.metadata?.instructor
  
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={`${classItem.metadata.featured_image.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={classItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom pb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-white/80 text-sm">
              {classItem.metadata.category?.value} / {classItem.metadata.difficulty_level?.value}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            {classItem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <AccessBadge accessType={classItem.metadata.access_type} />
            <DifficultyBadge difficulty={classItem.metadata.difficulty_level} />
            <span className="text-white/80">{classItem.metadata.duration} minutes</span>
          </div>
        </div>
      </section>
      
      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-olive-800 hover:text-olive-700 mb-8 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Classes
            </Link>
            
            <h2 className="font-serif text-3xl text-gray-900 mb-6">About This Class</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {classItem.metadata.description}
            </p>
            
            {instructor && (
              <div className="bg-cream-100 rounded-2xl p-8">
                <h3 className="font-serif text-2xl text-gray-900 mb-6">Your Instructor</h3>
                <div className="flex items-start gap-6">
                  <img
                    src={`${instructor.metadata?.photo?.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={instructor.metadata?.name || instructor.title}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-serif text-xl text-gray-900 mb-2">
                      {instructor.metadata?.name || instructor.title}
                    </h4>
                    {instructor.metadata?.specialties && (
                      <p className="text-olive-800 text-sm mb-3">
                        {instructor.metadata.specialties}
                      </p>
                    )}
                    <p className="text-gray-600 line-clamp-3">
                      {instructor.metadata?.bio}
                    </p>
                    <Link
                      href={`/instructors/${instructor.slug}`}
                      className="inline-flex items-center gap-2 text-olive-800 hover:text-olive-700 mt-4 font-medium transition-colors"
                    >
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}