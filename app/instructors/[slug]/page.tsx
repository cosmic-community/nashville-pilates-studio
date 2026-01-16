// app/instructors/[slug]/page.tsx
import { getInstructorBySlug, getInstructors, getClasses } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClassCard from '@/components/ClassCard'

export const revalidate = 60

export async function generateStaticParams() {
  const instructors = await getInstructors()
  return instructors.map((instructor) => ({
    slug: instructor.slug,
  }))
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [instructor, allClasses] = await Promise.all([
    getInstructorBySlug(slug),
    getClasses(),
  ])
  
  if (!instructor) {
    notFound()
  }
  
  const instructorClasses = allClasses.filter(
    (c) => c.metadata?.instructor?.slug === instructor.slug
  )
  
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-cream-100">
        <div className="container-custom">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-olive-800 hover:text-olive-700 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <img
              src={`${instructor.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={instructor.metadata.name}
              className="w-full md:w-80 h-80 rounded-2xl object-cover shadow-medium"
            />
            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
                {instructor.metadata.name}
              </h1>
              {instructor.metadata.specialties && (
                <p className="text-olive-800 text-lg mb-6">
                  {instructor.metadata.specialties}
                </p>
              )}
              <p className="text-gray-600 text-lg leading-relaxed">
                {instructor.metadata.bio}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Classes by this instructor */}
      {instructorClasses.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="font-serif text-3xl text-gray-900 mb-8">
              Classes with {instructor.metadata.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorClasses.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}