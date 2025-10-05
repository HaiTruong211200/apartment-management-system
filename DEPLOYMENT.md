# Vercel Deployment Checklist

## Pre-deployment Setup

### 1. MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account at https://cloud.mongodb.com
- [ ] Create a new cluster
- [ ] Create a database user with read/write permissions
- [ ] Whitelist IP addresses (0.0.0.0/0 for all IPs)
- [ ] Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/apartment-management-system`

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

### Common Issues:

1. **MongoDB Connection Error**

   - Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0
   - Verify connection string is correct
   - Ensure database user has proper permissions

2. **Vercel Function Timeout**

   - Check function timeout in vercel.json (set to 30s)
   - Optimize database queries

3. **CORS Issues**

   - Update CORS origin in api/index.js with your Vercel domain

4. **Environment Variables Not Working**
   - Redeploy after setting environment variables
   - Check variable names are exactly correct

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
