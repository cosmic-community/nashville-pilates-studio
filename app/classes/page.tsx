import { getClasses, getSiteSettings } from '@/lib/cosmic'
import ClassCard from '@/components/ClassCard'

export const revalidate = 60

export default async function ClassesPage() {
  const [classes, settings] = await Promise.all([
    getClasses(),
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
            alt="Our Classes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.2em] mb-4">Our Classes</p>
          <h1 className="font-serif text-5xl md:text-6xl italic mb-6">
            Strengthen<br />with softness.
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            We offer a range of mindful Pilates experiences designed to support every stage of your journey.
          </p>
        </div>
      </section>
      
      {/* Classes Grid */}
      <section className="py-20 bg-cream-50">
        <div className="container-custom">
          {classes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No classes available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}