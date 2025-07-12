'use client';
import { useState } from 'react';
import PaymentForm from '@/components/payments/PaymentForm';

export default function StripeTestPage() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <h1 style={{ marginBottom: 24 }}>Stripe Payment Test</h1>
      <PaymentForm
        amount={10}
        onSuccess={(paymentIntent) => setResult(`✅ Payment succeeded! ID: ${paymentIntent.id}`)}
        onError={(error) => setResult(`❌ Payment failed: ${error.message || error}`)}
      />
      {result && (
        <div style={{ marginTop: 24, padding: 12, background: '#f6f6f6', borderRadius: 6, color: result.startsWith('✅') ? 'green' : 'red' }}>
          {result}
        </div>
      )}
      <div style={{ marginTop: 32, fontSize: 14, color: '#888' }}>
        <div>Test card: <b>4242 4242 4242 4242</b></div>
        <div>Any future date, any CVC</div>
      </div>
    </div>
  );
} 