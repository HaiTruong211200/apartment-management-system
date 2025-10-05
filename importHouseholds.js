const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Household = require('./src/models/Household');

// Load environment variables
dotenv.config();

const importHouseholds = async () => {
  try {
    // Read and parse JSON data
    console.log('Reading households data...');
    const data = JSON.parse(fs.readFileSync('households.json', 'utf-8'));
    console.log(`Found ${data.length} households to import`);

    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI ||
        'mongodb://127.0.0.1:27017/apartment-management-system';
    console.log('Connecting to MongoDB...');

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing data (optional - uncomment if you want to clear existing
    // data) console.log('Clearing existing households...'); await
    // Household.deleteMany({});

    // Insert new data with duplicate handling
    console.log('Importing households...');
    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const householdData of data) {
      try {
        // Try to find existing household by apartment number
        const existingHousehold = await Household.findOne(
            {apartmentNumber: householdData.apartmentNumber});

        if (existingHousehold) {
          // Update existing household
          await Household.findOneAndUpdate(
              {apartmentNumber: householdData.apartmentNumber}, householdData,
              {new: true});
          updated++;
          console.log(`Updated household for apartment ${
              householdData.apartmentNumber}`);
        } else {
          // Create new household
          const household = new Household(householdData);
          await household.save();
          imported++;
          console.log(`Imported household for apartment ${
              householdData.apartmentNumber}`);
        }
      } catch (error) {
        errors++;
        console.error(
            `Error processing apartment ${householdData.apartmentNumber}:`,
            error.message);
      }
    }

  } catch (error) {
    console.error('Error importing households:', error.message);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the import
importHouseholds();
