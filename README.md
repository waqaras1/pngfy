# PngFy Pro - AI Background Removal

A premium SaaS platform for AI-powered background removal, built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **AI Background Removal**: Powered by Remove.bg API
- **Drag & Drop Upload**: Intuitive file upload interface
- **Real-time Processing**: Live progress tracking
- **High-Quality Output**: PNG format with transparency

### SaaS Features
- **User Authentication**: Secure login/signup with Clerk
- **Credit System**: Pay-per-use model with subscription plans
- **File Management**: Cloudinary integration for image storage
- **Processing History**: Track all processed images
- **Billing & Subscriptions**: Stripe integration for payments
- **API Access**: RESTful API for power users
- **Dark/Light Mode**: Beautiful theme switching

### Technical Stack
- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **Background Removal**: Remove.bg API

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Remove.bg API key
- Cloudinary account
- Stripe account
- Clerk account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pngfy-pro-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/pngfy_pro"
   
   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   
   # Remove.bg API
   REMOVE_BG_API_KEY=your_remove_bg_api_key_here
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/          # Authentication pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   └── ui/              # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔧 Configuration

### Database Setup
1. Create a PostgreSQL database
2. Update `DATABASE_URL` in your environment variables
3. Run `npm run db:push` to create tables

### Authentication Setup (Clerk)
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable and secret keys
4. Configure sign-in/sign-up URLs

### File Storage Setup (Cloudinary)
1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Update environment variables

### Payment Setup (Stripe)
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhook endpoints
4. Update environment variables

### Background Removal API (Remove.bg)
1. Sign up at [remove.bg](https://remove.bg)
2. Get your API key
3. Update environment variables

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- Netlify
- AWS Amplify

## 📊 Database Schema

### Users
- Authentication via Clerk
- Profile information
- Subscription details

### Subscriptions
- Plan information
- Billing details
- Status tracking

### Credits
- Credit balance
- Purchase history
- Usage tracking

### Images
- Original and processed URLs
- Processing metadata
- User association

### API Keys
- User-generated API keys
- Usage tracking
- Access control

## 🔌 API Endpoints

### Background Removal
- `POST /api/remove-background` - Process image

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

### Billing
- `GET /api/billing/subscription` - Get subscription
- `POST /api/billing/create-checkout` - Create checkout session
- `POST /api/billing/webhook` - Stripe webhook

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use shadcn/ui components for consistent design

### Components
- All components are in the `components/` directory
- Dashboard components in `components/dashboard/`
- Reusable UI components in `components/ui/`

### Database
- Modify `prisma/schema.prisma` for database changes
- Run `npm run db:migrate` after schema changes

## 🔒 Security

- Authentication required for all dashboard routes
- API rate limiting
- File upload validation
- Secure environment variable handling
- CORS configuration

## 📈 Monitoring & Analytics

- Error tracking (Sentry integration ready)
- Usage analytics
- Performance monitoring
- User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@pngfy-pro.com or create an issue in the repository.

## 🔮 Roadmap

- [ ] Batch processing
- [ ] Advanced editing tools
- [ ] Team collaboration
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] White-label solutions
- [ ] Enterprise features

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
