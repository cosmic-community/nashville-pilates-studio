import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Use the API version that matches the installed stripe package
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

// Changed: Added formatAmountForStripe function to convert dollars to cents for Stripe
export function formatAmountForStripe(amount: number): number {
  // Stripe expects amounts in cents (smallest currency unit)
  // Convert dollars to cents by multiplying by 100
  return Math.round(amount * 100)
}

// Changed: Added formatAmountFromStripe function for displaying amounts from Stripe
export function formatAmountFromStripe(amount: number): number {
  // Convert cents back to dollars for display
  return amount / 100
}