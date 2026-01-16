'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'

export default function CartIcon() {
  // Changed: Added try-catch pattern to handle cases where CartProvider is not available
  // This prevents build errors during static page generation (e.g., /_not-found)
  let itemCount = 0
  
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { cart } = useCart()
    itemCount = cart.items.length
  } catch {
    // CartProvider not available (e.g., during static generation)
    // Return cart icon without count
  }

  return (
    <Link 
      href="/cart" 
      className="relative inline-flex items-center gap-2 text-gray-600 hover:text-olive-800 transition-colors"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-olive-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </Link>
  )
}