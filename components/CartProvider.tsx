'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { CartState, CartItem } from '@/types'
import { getCart, addToCart as addToCartLib, removeFromCart as removeFromCartLib, clearCart as clearCartLib } from '@/lib/cart'

interface CartContextType {
  cart: CartState
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  isInCart: (itemId: string) => boolean
}

// Changed: Export the context so components can check if it exists
export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCart(getCart())
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const newCart = addToCartLib(item)
    setCart(newCart)
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    const newCart = removeFromCartLib(itemId)
    setCart(newCart)
  }, [])

  const clearCart = useCallback(() => {
    const newCart = clearCartLib()
    setCart(newCart)
  }, [])

  const isInCart = useCallback((itemId: string) => {
    return cart.items.some(item => item.id === itemId)
  }, [cart.items])

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Changed: Added a safe hook that returns default values when outside CartProvider
export function useCartSafe(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    // Return safe default values when not in CartProvider
    return {
      cart: { items: [], total: 0 },
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      isInCart: () => false,
    }
  }
  return context
}