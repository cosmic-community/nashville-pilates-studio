'use client'

import { useState } from 'react'
import { SiteSettings, PilatesClass } from '@/types'

interface PromoSectionProps {
  settings: SiteSettings
  classes: PilatesClass[]
}

export default function PromoSection({ settings, classes }: PromoSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classChoice: '',
  })
  
  const { promo_headline, promo_offer, hero_subheadline } = settings.metadata
  
  if (!promo_headline) return null
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for signing up! We\'ll be in touch soon.')
    setFormData({ name: '', email: '', classChoice: '' })
  }
  
  return (
    <section className="relative min-h-[600px]">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Image Side */}
        <div className="relative h-64 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&auto=format"
            alt="Pilates Studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Form Side */}
        <div className="bg-olive-800 text-white p-8 lg:p-16 flex flex-col justify-center">
          <p className="uppercase tracking-[0.2em] text-white/70 text-sm mb-4">
            Ready to Move and Feel Better?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic mb-4">
            {promo_headline}
          </h2>
          {promo_offer && (
            <p className="font-serif text-2xl md:text-3xl italic text-cream-300 mb-6">
              and {promo_offer}
            </p>
          )}
          {hero_subheadline && (
            <p className="text-white/80 mb-8 max-w-lg">
              {hero_subheadline}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                required
              />
            </div>
            <select
              value={formData.classChoice}
              onChange={(e) => setFormData({ ...formData, classChoice: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60 transition-colors appearance-none cursor-pointer"
              required
            >
              <option value="" className="text-gray-800">Choose Your Class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.slug} className="text-gray-800">
                  {classItem.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-white text-olive-800 rounded-pill font-medium hover:bg-cream-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}