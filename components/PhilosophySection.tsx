import { SiteSettings, Instructor } from '@/types'

interface PhilosophySectionProps {
  settings: SiteSettings
  instructors: Instructor[]
}

export default function PhilosophySection({ settings, instructors }: PhilosophySectionProps) {
  const quote = settings.metadata.philosophy_quote
  
  if (!quote) return null
  
  return (
    <section className="py-24 bg-cream-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div>
            {instructors.length > 0 && instructors[0]?.metadata?.photo && (
              <img
                src={`${instructors[0].metadata.photo.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
                alt="Our Philosophy"
                className="w-full h-[500px] object-cover rounded-3xl shadow-medium"
              />
            )}
          </div>
          
          {/* Content */}
          <div>
            <p className="uppercase tracking-[0.2em] text-gray-600 text-sm mb-6">
              Our Philosophy
            </p>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 italic leading-snug">
              "{quote}"
            </blockquote>
            
            {/* Instructor Avatars */}
            {instructors.length > 0 && (
              <div className="flex items-center mt-8">
                <div className="flex -space-x-3">
                  {instructors.slice(0, 3).map((instructor, index) => {
                    if (!instructor?.metadata?.photo) return null
                    return (
                      <img
                        key={instructor.id}
                        src={`${instructor.metadata.photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                        alt={instructor.metadata.name}
                        className="w-12 h-12 rounded-full border-2 border-white object-cover"
                        style={{ zIndex: 10 - index }}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}