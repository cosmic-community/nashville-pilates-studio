import { stripe } from '@/lib/stripe'
import { createOrder } from '@/lib/cosmic'
import Link from 'next/link'
import ClearCartOnSuccess from '@/components/ClearCartOnSuccess'

interface PageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams
  
  let session = null
  let error = null

  if (session_id) {
    try {
      session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      })
      
      // Create order in Cosmic if not already created
      if (session.payment_status === 'paid') {
        await createOrder({
          stripe_session_id: session_id,
          customer_email: session.customer_details?.email || 'unknown',
          total_amount: (session.amount_total || 0) / 100,
          items: session.metadata?.items || '[]',
        })
      }
    } catch (err) {
      console.error('Error retrieving session:', err)
      error = 'Unable to retrieve order details'
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <ClearCartOnSuccess />
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your purchase was successful. You now have lifetime access to your purchased classes.
        </p>
        
        {session && (
          <div className="bg-cream-100 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-serif text-xl text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Order ID:</span> {session.id.slice(-8).toUpperCase()}</p>
              {session.customer_details?.email && (
                <p><span className="font-medium">Email:</span> {session.customer_details.email}</p>
              )}
              <p><span className="font-medium">Total:</span> ${((session.amount_total || 0) / 100).toFixed(2)}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/classes" className="btn-primary">
            Browse More Classes
          </Link>
          <Link href="/" className="btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}