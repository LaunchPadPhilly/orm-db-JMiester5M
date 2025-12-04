# Vercel Deployment Guide

## Prerequisites
- GitHub account with this repository
- Vercel account (sign up at https://vercel.com)
- Neon PostgreSQL database (or other PostgreSQL provider)
- Firebase project with authentication enabled

## Step 1: Push to GitHub
Ensure all your changes are committed and pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository: `orm-db-JMiester5M`
4. Click "Import"

## Step 3: Configure Environment Variables
In the Vercel dashboard, go to your project settings > Environment Variables and add:

### Database
```
DATABASE_URL=your_neon_database_url_here
```

### Firebase Client (Public)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Admin (Private - Keep Secret!)
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key_with_newlines"
```

### Admin Email
```
NEXT_PUBLIC_ADMIN_EMAIL=your_email@example.com
```

**Important:** 
- Copy these values from your local `.env` file
- For `FIREBASE_PRIVATE_KEY`, include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` and all the `\n` characters

## Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

## Step 5: Run Database Migration (First Time Only)
After first deployment, you need to push your Prisma schema to the database:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Run migration: `vercel env pull .env.production`
5. Then: `npx prisma db push`

Alternatively, if you've already set up the database with migrations locally, it should work automatically.

## Step 6: Test Your Deployment
1. Visit your deployed site
2. Test all pages (Home, About, Projects, Contact)
3. Try logging in with your Firebase credentials
4. Test creating a new project (should only work when logged in)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify `DATABASE_URL` is correct

### Authentication Not Working
- Verify all Firebase environment variables are set
- Check Firebase console that authentication is enabled
- Ensure `FIREBASE_PRIVATE_KEY` includes the full key with newlines

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon dashboard that database is active
- Ensure Prisma schema matches your database

### Images Not Loading
- Ensure images are in the `public/` folder
- Check image paths start with `/` (e.g., `/Headshot.jpg`)
- Verify image files are committed to git

## Automatic Deployments
Vercel automatically deploys when you push to your main branch:
```bash
git add .
git commit -m "Update content"
git push origin main
```

Your site will rebuild and redeploy automatically!

## Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take 24-48 hours)

## Monitoring
- View deployment logs in Vercel dashboard
- Check analytics in Vercel dashboard
- Monitor function invocations and build times

## Support
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Firebase Docs: https://firebase.google.com/docs
