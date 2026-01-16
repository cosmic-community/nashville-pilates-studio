import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HeroProps {
  settings: SiteSettings
}

export default function Hero({ settings }: HeroProps) {
  const { hero_headline, hero_subheadline, hero_image } = settings.metadata
  
  return (
    <section className="bg-cream-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-12">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-600 mb-4">
              Crafted for Women
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gray-900 italic leading-tight mb-6">
              {hero_headline}
            </h1>
            {hero_subheadline && (
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                {hero_subheadline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/classes" className="btn-primary">
                Our Classes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/classes" className="btn-secondary">
                Meet Aligna Studio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <img
              src={`${hero_image.imgix_url}?w=1200&h=1400&fit=crop&auto=format,compress`}
              alt="Pilates Practice"
              className="w-full h-[500px] lg:h-[600px] object-cover rounded-3xl shadow-medium"
            />
          </div>
        </div>
      </div>
    </section>
  )
}