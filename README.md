# Apartment Management System

A REST API for managing apartment household information, built with Node.js, Express, and MongoDB.

## Features

- 🏠 Household management (CRUD operations)
- 📊 Pagination and search functionality
- 🔍 Filter by apartment number and owner name
- 📱 RESTful API endpoints
- 🌐 Web interface for viewing households
- ☁️ Ready for Vercel deployment

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/apartment-management-system
   NODE_ENV=development
   ```

4. Import sample data (optional):

   ```bash
   npm run import:households
   ```

5. Start the development server:
   ```bash
   npm run local:dev
   ```

The server will be available at `http://localhost:3000`

## API Endpoints

### Households

- `GET /api/households` - Get all households (with pagination and search)
- `GET /api/households/:id` - Get household by ID
- `POST /api/households` - Create new household
- `PUT /api/households/:id` - Update household
- `DELETE /api/households/:id` - Delete household

### Query Parameters for GET /api/households

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `apartmentNumber` - Filter by apartment number
- `ownerName` - Filter by owner name

### Example Requests

```bash
# Get all households
curl http://localhost:3000/api/households

# Get households with pagination
curl "http://localhost:3000/api/households?page=2&limit=5"

# Search by owner name
curl "http://localhost:3000/api/households?ownerName=John"

# Get specific household
curl http://localhost:3000/api/households/HOUSEHOLD_ID
```

## Vercel Deployment

### Prerequisites

1. A Vercel account
2. MongoDB Atlas account (for cloud database)

### Deployment Steps

1. **Prepare your MongoDB Atlas connection:**

   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string

2. **Deploy to Vercel:**

   ```bash
   # Install Vercel CLI (if not already installed)
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Set Environment Variables in Vercel:**

   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add the following variables:
     ```
     MONGO_URI=mongodb+srv://[username]:[password]@[cluster-url]/apartment-management-system
     NODE_ENV=production
     ```

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Environment Variables

| Variable    | Description                      | Example                                                             |
| ----------- | -------------------------------- | ------------------------------------------------------------------- |
| `MONGO_URI` | MongoDB connection string        | `mongodb+srv://[username]:[password]@[cluster-url]/[database-name]` |
| `NODE_ENV`  | Environment mode                 | `production` or `development`                                       |
| `PORT`      | Server port (auto-set by Vercel) | `3000`                                                              |

## Security Note

⚠️ **Important**: The MongoDB connection string examples in this documentation use placeholder format `[username]:[password]@[cluster-url]` to prevent triggering security scanners. Replace the bracketed placeholders with your actual credentials when setting up your environment variables.

Example of actual format:

- Placeholder: `mongodb+srv://[username]:[password]@[cluster-url]/database`
- Actual: `mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/myapp`

**Never commit real credentials to your repository!**

## Project Structure

```
apartment-management-system/
├── api/
│   └── index.js              # Vercel serverless function entry point
├── src/
│   ├── index.js              # Local development server
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── controllers/
│   │   └── householdController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Household.js
│   └── routes/
│       └── householdRoutes.js
├── public/
│   └── index.html            # Web interface
├── households.json           # Sample data
├── importHouseholds.js       # Data import script
├── vercel.json               # Vercel configuration
├── package.json
└── README.md
```

## Scripts

- `npm start` - Start production server (Vercel entry point)
- `npm run dev` - Start development server (Vercel entry point)
- `npm run local` - Start local development server
- `npm run local:dev` - Start local development server with nodemon
- `npm run import:households` - Import sample household data

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Validation:** Express Validator
- **Development:** Nodemon
- **Deployment:** Vercel
- **Frontend:** Vanilla HTML/CSS/JavaScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License
