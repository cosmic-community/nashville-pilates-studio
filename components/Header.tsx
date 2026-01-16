'use client'

import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './CartIcon'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-cream-200">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl text-gray-900">Aligna</span>
            <span className="text-olive-800 ml-1">•</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/classes" className="text-gray-600 hover:text-olive-800 transition-colors">
              Classes
            </Link>
            <Link href="/instructors" className="text-gray-600 hover:text-olive-800 transition-colors">
              Instructors
            </Link>
            <CartIcon />
            <Link href="/cart" className="btn-primary">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <CartIcon />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/classes" 
                className="text-gray-600 hover:text-olive-800 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes
              </Link>
              <Link 
                href="/instructors" 
                className="text-gray-600 hover:text-olive-800 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Instructors
              </Link>
              <Link 
                href="/cart" 
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}