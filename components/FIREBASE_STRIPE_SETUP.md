# Firebase Authentication & Stripe Payments Setup

This guide will help you set up Firebase authentication and Stripe payments for your InGenium project.

## 🔥 Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "ingenium-software")
4. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Optionally enable other providers (Google, GitHub, etc.)

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → "Web"
4. Register your app and copy the config object

### 4. Set Environment Variables
Create a `.env.local` file in your project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

## 💳 Stripe Setup

### 1. Create a Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up for a free account
3. Complete your account setup

### 2. Get API Keys
1. In Stripe Dashboard, go to "Developers" → "API keys"
2. Copy your "Publishable key" and "Secret key"
3. Make sure you're using test keys for development

### 3. Add Stripe Environment Variables
Add these to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test Authentication
1. Go to `http://localhost:3000/sign-in`
2. Try creating an account and signing in
3. Check Firebase Console to see registered users

### 4. Test Payments
1. Go to `http://localhost:3000/payments`
2. Use test card numbers:
   - **Success:** 4242 4242 4242 4242
   - **Decline:** 4000 0000 0000 0002
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits

## 📁 File Structure

```
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   └── stripe.ts            # Stripe configuration
├── contexts/
│   └── AuthContext.tsx      # Firebase authentication context
├── components/
│   └── payments/
│       └── PaymentForm.tsx  # Stripe payment form
├── app/
│   ├── api/stripe/          # Stripe API routes
│   │   ├── create-payment-intent/
│   │   └── create-customer/
│   ├── sign-in/             # Authentication page
│   └── payments/            # Payment demo page
```

## 🔧 Features Implemented

### Firebase Authentication
- ✅ Email/password registration and login
- ✅ User profile management
- ✅ Password reset functionality
- ✅ Real-time authentication state
- ✅ Protected routes

### Stripe Payments
- ✅ Payment intent creation
- ✅ Customer management
- ✅ Secure card processing
- ✅ Payment success/error handling
- ✅ Test mode support

## 🛡️ Security Notes

1. **Environment Variables**: Never commit your `.env.local` file
2. **API Keys**: Keep your Stripe secret key secure on the server
3. **Firebase Rules**: Configure Firestore security rules
4. **HTTPS**: Use HTTPS in production for secure payments

## 🚨 Troubleshooting

### Firebase Issues
- Check that all environment variables are set correctly
- Verify Firebase project settings
- Check browser console for errors

### Stripe Issues
- Ensure you're using test keys for development
- Check that API routes are working
- Verify payment intent creation

### Common Errors
- `Firebase: Error (auth/user-not-found)`: User doesn't exist
- `Firebase: Error (auth/wrong-password)`: Incorrect password
- `Stripe: Invalid API key`: Check your Stripe keys

## 📚 Next Steps

1. **Customize UI**: Style the authentication and payment forms
2. **Add Features**: Implement user profiles, subscription plans
3. **Production**: Deploy with proper environment variables
4. **Monitoring**: Set up Firebase Analytics and Stripe webhooks

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs) 