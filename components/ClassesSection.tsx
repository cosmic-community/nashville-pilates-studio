import Link from 'next/link'
import { PilatesClass } from '@/types'
import ClassCard from './ClassCard'

interface ClassesSectionProps {
  classes: PilatesClass[]
}

export default function ClassesSection({ classes }: ClassesSectionProps) {
  if (classes.length === 0) return null
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg mb-4 max-w-2xl mx-auto">
            At Aligna, we believe in the art of mindful movement. Our studio offers a serene space where body and mind come into harmony through graceful, intentional practice.
          </p>
          <Link href="/classes" className="btn-primary">
            View All Classes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.slice(0, 3).map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      </div>
    </section>
  )
}