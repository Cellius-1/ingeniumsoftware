'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PaymentForm from '@/components/payments/PaymentForm';

export default function PaymentsPage() {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentStatus('success');
    setPaymentMessage(`Payment successful! Transaction ID: ${paymentIntent.id}`);
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    setPaymentMessage(error.message || 'Payment failed');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please sign in to access the payment page.</p>
          <a 
            href="/sign-in" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Payment Demo</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Payment</h2>
          <p className="text-gray-600 mb-6">
            This is a demo payment form. Use Stripe test card numbers:
          </p>
          <ul className="text-sm text-gray-600 mb-6 space-y-1">
            <li>• <strong>Success:</strong> 4242 4242 4242 4242</li>
            <li>• <strong>Decline:</strong> 4000 0000 0000 0002</li>
            <li>• <strong>Expiry:</strong> Any future date</li>
            <li>• <strong>CVC:</strong> Any 3 digits</li>
          </ul>
          
          <PaymentForm
            amount={29.99}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>

        {paymentStatus !== 'idle' && (
          <div className={`p-4 rounded-lg ${
            paymentStatus === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <h3 className="font-semibold mb-2">
              {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </h3>
            <p>{paymentMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
} 