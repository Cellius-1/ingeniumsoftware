'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export default function TestFirebase() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Test if Firebase is initialized
        if (auth) {
          setStatus('✅ Firebase is initialized');
          console.log('Firebase auth object:', auth);
        } else {
          setStatus('❌ Firebase auth is null');
        }
      } catch (error) {
        setStatus(`❌ Firebase error: ${error}`);
        console.error('Firebase test error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Firebase Connection Test</h1>
      <p>Status: {status}</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Environment Variables Check:</h2>
        <ul>
          <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</li>
          <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</li>
          <li>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</li>
        </ul>
      </div>
    </div>
  );
} 