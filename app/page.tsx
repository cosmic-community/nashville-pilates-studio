import { getSiteSettings, getClasses, getInstructors } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturesSection from '@/components/FeaturesSection'
import PhilosophySection from '@/components/PhilosophySection'
import ClassesSection from '@/components/ClassesSection'
import PromoSection from '@/components/PromoSection'

export const revalidate = 60

export default async function HomePage() {
  const [settings, classes, instructors] = await Promise.all([
    getSiteSettings(),
    getClasses(),
    getInstructors(),
  ])
  
  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unable to load site content. Please try again later.</p>
      </div>
    )
  }
  
  return (
    <>
      <Hero settings={settings} />
      <FeaturesSection />
      <PhilosophySection settings={settings} instructors={instructors} />
      <ClassesSection classes={classes} />
      <PromoSection settings={settings} classes={classes} />
    </>
  )
}