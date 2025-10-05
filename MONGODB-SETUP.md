# MongoDB Connection String Setup Guide

This guide helps you get the correct MongoDB connection string for your Vercel deployment.

## Getting Your MongoDB Atlas Connection String

### Step 1: Access MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster

### Step 2: Get Connection String

1. Click "Connect" button on your cluster
2. Select "Connect your application"
3. Choose "Node.js" as driver
4. Copy the connection string shown

### Step 3: Format for Your App

The connection string will look like this format:

```
mongodb+srv://<username>:<password>@<cluster-address>/<database-name>
```

**Important replacements:**

- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Replace `<database-name>` with `apartment-management-system`

### Step 4: Set in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add `MONGO_URI` with your complete connection string
5. Set Environment to "Production"
6. Redeploy your application

## Security Reminder

- Never commit connection strings to your repository
- Use environment variables for all credentials
- Always use placeholder values in documentation

## Troubleshooting

- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Verify username/password are correct
- Check that database user has read/write permissions
