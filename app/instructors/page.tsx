import { getInstructors, getSiteSettings } from '@/lib/cosmic'
import Link from 'next/link'

export const revalidate = 60

export default async function InstructorsPage() {
  const [instructors, settings] = await Promise.all([
    getInstructors(),
    getSiteSettings(),
  ])
  
  const heroImage = settings?.metadata?.hero_image?.imgix_url || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&h=600&fit=crop'
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`${heroImage}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt="Our Instructors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.2em] mb-4">Our Team</p>
          <h1 className="font-serif text-5xl md:text-6xl italic mb-6">
            Meet Our<br />Instructors
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Our certified instructors bring passion, expertise, and compassion to every class.
          </p>
        </div>
      </section>
      
      {/* Instructors Grid */}
      <section className="py-20 bg-cream-50">
        <div className="container-custom">
          {instructors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No instructors available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <Link 
                  key={instructor.id} 
                  href={`/instructors/${instructor.slug}`}
                  className="group"
                >
                  <article className="card h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={`${instructor.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                        alt={instructor.metadata.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-gray-900 mb-2 group-hover:text-olive-800 transition-colors">
                        {instructor.metadata.name}
                      </h3>
                      {instructor.metadata.specialties && (
                        <p className="text-olive-800 text-sm mb-3">
                          {instructor.metadata.specialties}
                        </p>
                      )}
                      <p className="text-gray-600 line-clamp-3">
                        {instructor.metadata.bio}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}