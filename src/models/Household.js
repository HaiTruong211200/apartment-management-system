const mongoose = require('mongoose');

const HouseholdSchema = new mongoose.Schema(
    {
      apartmentNumber: {
        type: String,
        required: [true, 'Apartment number is required'],
        unique: true,
        trim: true,
        index: true,
      },
      ownerName: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true,
      },
      contact: {
        phone: {
          type: String,
          required: [true, 'Phone number is required'],
          trim: true,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          lowercase: true,
          trim: true,
        },
      },
      members: [
        {
          name: {type: String, required: true},
          relation: {type: String, required: true},
          age: {type: Number, min: 0},
        },
      ],
    },
    {
      timestamps: true,
    });

module.exports = mongoose.model('Household', HouseholdSchema);
