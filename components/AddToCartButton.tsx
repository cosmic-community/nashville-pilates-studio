'use client'

import { useState } from 'react'
import { useCart } from './CartProvider'
import { PilatesClass } from '@/types'

interface AddToCartButtonProps {
  classItem: PilatesClass
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function AddToCartButton({ classItem, variant = 'primary', className = '' }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  
  const price = classItem.metadata.price || 0
  const isFree = classItem.metadata.access_type?.key === 'free' || price === 0
  const alreadyInCart = isInCart(classItem.id)

  const handleAddToCart = () => {
    if (alreadyInCart || isFree) return
    
    setIsAdding(true)
    addToCart({
      id: classItem.id,
      slug: classItem.slug,
      title: classItem.title,
      price: price,
      image: classItem.metadata.featured_image.imgix_url,
      duration: classItem.metadata.duration,
    })
    
    setTimeout(() => setIsAdding(false), 500)
  }

  if (isFree) {
    return (
      <button 
        className={`btn-primary ${className}`}
        onClick={() => {/* Navigate to class or show video */}}
      >
        Watch Free Class
      </button>
    )
  }

  if (alreadyInCart) {
    return (
      <button 
        className={`${variant === 'primary' ? 'btn-secondary' : 'btn-outline'} ${className}`}
        disabled
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        In Cart
      </button>
    )
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${className} ${isAdding ? 'opacity-75' : ''}`}
    >
      {isAdding ? (
        <>
          <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart - ${price.toFixed(2)}
        </>
      )}
    </button>
  )
}