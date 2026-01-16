'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-cream-50 border-b border-cream-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl italic text-gray-900">
            Aligna
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-olive-800 transition-colors">
              Home
            </Link>
            <Link href="/classes" className="text-gray-700 hover:text-olive-800 transition-colors">
              Classes
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-700 text-sm">+1 (800) 456-7890</span>
            <Link href="/classes" className="btn-primary">
              Book Class
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-300">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-olive-800 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/classes"
                className="text-gray-700 hover:text-olive-800 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes
              </Link>
              <Link
                href="/classes"
                className="btn-primary justify-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Class
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}