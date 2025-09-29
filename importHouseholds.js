const mongoose = require('mongoose');
const fs = require('fs');
const Household = require('./src/models/Household');

const data = JSON.parse(fs.readFileSync('households.json', 'utf-8'));

mongoose
    .connect('mongodb://127.0.0.1:27017/apartment-management-system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('Connected to MongoDB');

      await Household.insertMany(data);
      console.log(`Inserted ${data.length} households`);

      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err);
    });
