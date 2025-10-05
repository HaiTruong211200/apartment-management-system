# 🚀 Quick Deployment Guide

This is a streamlined guide to get your apartment management system deployed on Vercel quickly.

## Step-by-Step Deployment

### 1. Set up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free account
2. Create a new cluster (use the free tier)
3. Create a database user:

   - Database Access → Add New Database User
   - Choose "Password" authentication
   - Username: `apartment-user` (or any username you prefer)
   - Password: Generate a strong password and save it
   - Database User Privileges: Read and write to any database

4. Configure network access:

   - Network Access → Add IP Address
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - Confirm

5. Get your connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your user password
   - Replace `<dbname>` with `apartment-management-system`

### 2. Deploy to Vercel (3 minutes)

#### Option A: Using GitHub (Recommended)

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

#### Option B: Using Vercel CLI

```bash
# Install and login (if you have permission issues, use npx)
npx vercel login

# Deploy
npx vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - What's your project's name? apartment-management-system
# - In which directory is your code located? ./
# - Want to override settings? N
```

### 3. Set Environment Variables (2 minutes)

In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add these variables:

| Name        | Value                                | Environment |
| ----------- | ------------------------------------ | ----------- |
| `MONGO_URI` | Your MongoDB Atlas connection string | Production  |
| `NODE_ENV`  | `production`                         | Production  |

3. Click "Deploy" or redeploy:
   ```bash
   npx vercel --prod
   ```

### 4. Test Your Deployment (1 minute)

Your app should be live at: `https://your-project-name.vercel.app`

Test these endpoints:

- `https://your-project-name.vercel.app/` (web interface)
- `https://your-project-name.vercel.app/api/health` (API health check)
- `https://your-project-name.vercel.app/api/households` (households data)

## Common Issues & Quick Fixes

### ❌ "Build failed" or "All checks failed"

**Quick Fix:**

```bash
# Clean install locally first
rm -rf node_modules package-lock.json
npm install
npm start  # Test locally

# Then redeploy
npx vercel --prod
```

### ❌ "MongoDB connection error"

**Quick Fix:**

1. Double-check your MONGO_URI in Vercel settings
2. Ensure IP 0.0.0.0/0 is whitelisted in MongoDB Atlas
3. Verify connection string follows MongoDB Atlas format (check your MongoDB Atlas dashboard)

### ❌ API returns 500 errors

**Quick Fix:**

```bash
# Check deployment logs
npx vercel logs https://your-deployment-url
```

## Import Sample Data

After successful deployment, import sample household data:

1. Update your local `.env` with the production MongoDB URI
2. Run the import script:
   ```bash
   node importHouseholds.js
   ```

## Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Vercel deployment successful (no build errors)
- [ ] Environment variables set in Vercel
- [ ] Web interface loads at your Vercel URL
- [ ] API endpoints respond correctly
- [ ] Sample data imported (optional)

## Need Help?

If you encounter issues:

1. Check the main `DEPLOYMENT.md` for detailed troubleshooting
2. Review Vercel deployment logs: `npx vercel logs`
3. Test locally first: `npm start`

Your apartment management system should now be live! 🎉
