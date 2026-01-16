import { CartItem, CartState } from '@/types'

const CART_STORAGE_KEY = 'pilates-cart'

export function getCart(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 }
  }
  
  const stored = localStorage.getItem(CART_STORAGE_KEY)
  if (!stored) {
    return { items: [], total: 0 }
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return { items: [], total: 0 }
  }
}

export function saveCart(cart: CartState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(item: Omit<CartItem, 'quantity'>): CartState {
  const cart = getCart()
  const existingIndex = cart.items.findIndex(i => i.id === item.id)
  
  if (existingIndex >= 0) {
    // Item already in cart, don't add again (classes are one-time purchases)
    return cart
  }
  
  const newItem: CartItem = { ...item, quantity: 1 }
  const newItems = [...cart.items, newItem]
  const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  
  const newCart: CartState = { items: newItems, total: newTotal }
  saveCart(newCart)
  return newCart
}

export function removeFromCart(itemId: string): CartState {
  const cart = getCart()
  const newItems = cart.items.filter(i => i.id !== itemId)
  const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  
  const newCart: CartState = { items: newItems, total: newTotal }
  saveCart(newCart)
  return newCart
}

export function clearCart(): CartState {
  const newCart: CartState = { items: [], total: 0 }
  saveCart(newCart)
  return newCart
}

export function getCartItemCount(): number {
  const cart = getCart()
  return cart.items.length
}