# InGenium - Business Management Platform

A comprehensive platform for business management, funding discovery, and content creation built with Next.js, React, and Firebase.

## Features

- **Business Management Hub**: Task management, calendar, and progress tracking
- **Financial Aid Tools**: State-specific grant finder and application tracking
- **Content Creation Toolkit**: Social media templates, pitch deck builder, and branding kit
- **User Dashboard**: Personalized overview of all tools and progress

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Stripe account (for payments)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd c:\Users\tharu\OneDrive\Documents\ingeniumsoftware
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Get your Firebase config from Project Settings
6. Update `.env.local` with your Firebase credentials

### 3. Stripe Setup (Optional)

1. Create a [Stripe account](https://stripe.com/)
2. Get your API keys from the Stripe dashboard
3. Update `.env.local` with your Stripe keys

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── dashboard/         # User dashboard
│   ├── business-hub/      # Business management tools
│   ├── funding/           # Grant finder and funding tools
│   ├── content-toolkit/   # Content creation tools
│   └── api/               # API routes
├── components/            # Reusable React components
├── contexts/              # React contexts (Auth, etc.)
├── lib/                   # Utility libraries (Firebase, Stripe)
├── styles/                # CSS files
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to InGenium Software.