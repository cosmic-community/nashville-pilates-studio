import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Changed: Updated to match stripe@14.14.0 SDK expected version
  typescript: true,
})

export function formatAmountForStripe(amount: number): number {
  // Stripe expects amounts in cents
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number): number {
  // Convert from cents to dollars
  return amount / 100
}