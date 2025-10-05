# Vercel Deployment Checklist

## ⚠️ SECURITY NOTICE

**NEVER commit real MongoDB credentials to version control!**

- Always use placeholder values in documentation
- Keep actual credentials in environment variables only
- Use `.env` files for local development (excluded by `.gitignore`)
- Set production credentials in Vercel dashboard only

## Pre-deployment Setup

### 1. MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account at https://cloud.mongodb.com
- [ ] Create a new cluster
- [ ] Create a database user with read/write permissions
- [ ] Whitelist IP addresses (0.0.0.0/0 for all IPs)
- [ ] Get connection string from MongoDB Atlas dashboard

### 2. Local Testing

- [ ] Test local development server: `npm run local:dev`
- [ ] Test Vercel-compatible server: `npm start`
- [ ] Verify API endpoints work: `curl http://localhost:3000/api/households`
- [ ] Import sample data: `node importHouseholds.js`

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? apartment-management-system
# - Directory? ./
# - Override settings? N
```

### 3. Set Environment Variables

Go to Vercel Dashboard → Project → Settings → Environment Variables

Add these variables:

- `MONGO_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`

### 4. Redeploy with Environment Variables

```bash
vercel --prod
```

## Post-deployment Testing

### 1. Test API Endpoints

Replace `YOUR_VERCEL_URL` with your actual Vercel URL:

```bash
# Test health endpoint
curl https://YOUR_VERCEL_URL.vercel.app/api/health

# Test households endpoint
curl https://YOUR_VERCEL_URL.vercel.app/api/households

# Test web interface
# Visit: https://YOUR_VERCEL_URL.vercel.app
```

### 2. Import Data to Production

Update the `importHouseholds.js` script to use production MongoDB URI if needed, then run locally to populate production database.

## Troubleshooting

### Common Deployment Issues:

1. **Build Failed - "All checks have failed"**

   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility (ensure >= 18.x)
   - Check for syntax errors in code
   - Ensure all required files are present

2. **MongoDB Connection Error**

   - Verify MONGO_URI environment variable is set in Vercel
   - Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0
   - Verify connection string matches MongoDB Atlas format from your dashboard
   - Ensure database user has proper permissions

3. **Vercel Function Timeout**

   - Check function timeout in vercel.json (set to 30s)
   - Optimize database queries
   - Check if MongoDB connection is taking too long

4. **CORS Issues**

   - CORS is now set to allow all origins in production
   - If needed, update specific domains in api/index.js

5. **Environment Variables Not Working**

   - Redeploy after setting environment variables: `vercel --prod`
   - Check variable names are exactly correct (case-sensitive)
   - Verify variables are set for Production environment

6. **Static Files Not Loading**
   - Ensure public/ directory exists with index.html
   - Check vercel.json routes configuration
   - Verify static files are properly referenced

### Quick Fixes:

```bash
# If deployment fails, try these steps:

# 1. Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# 2. Test locally first
npm start

# 3. Check for Node.js version compatibility
node --version  # Should be 18.x or higher

# 4. Redeploy with verbose logging
npx vercel --prod --debug

# 5. Check deployment logs
npx vercel logs [deployment-url]
```

### Useful Commands:

```bash
# View deployment logs
vercel logs YOUR_DEPLOYMENT_URL

# List deployments
vercel ls

# Remove deployment
vercel rm PROJECT_NAME
```

## Files Created/Modified for Vercel:

- ✅ `vercel.json` - Vercel configuration
- ✅ `api/index.js` - Serverless function entry point
- ✅ `package.json` - Updated scripts and main entry
- ✅ `.env.example` - Environment variable template
- ✅ `.gitignore` - Git ignore file
- ✅ `README.md` - Updated documentation

## Success Indicators:

- [ ] Vercel deployment successful
- [ ] API endpoints accessible via HTTPS
- [ ] Web interface loads correctly
- [ ] Database operations work (CRUD)
- [ ] No console errors in browser/logs
