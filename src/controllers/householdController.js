const {validationResult} = require('express-validator');
const Household = require('../models/Household');

// @desc    Create new household
// @route   POST /api/households
exports.createHousehold = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const household = new Household(req.body);
    await household.save();
    res.status(201).json(household);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all households with pagination + search
// @route   GET /api/households
exports.getHouseholds = async (req, res, next) => {
  try {
    let {page = 1, limit = 10, apartmentNumber, ownerName} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (apartmentNumber) {
      filter.apartmentNumber = {$regex: apartmentNumber, $options: 'i'};
    }
    if (ownerName) {
      filter.ownerName = {$regex: ownerName, $options: 'i'};
    }

    const households = await Household.find(filter)
                           .skip((page - 1) * limit)
                           .limit(limit)
                           .sort({createdAt: -1});

    const total = await Household.countDocuments(filter);

    res.json({
      data: households,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get household by ID
// @route   GET /api/households/:id
exports.getHouseholdById = async (req, res, next) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      return res.status(404).json({message: 'Household not found'});
    }
    res.json(household);
  } catch (err) {
    next(err);
  }
};

// @desc    Update household
// @route   PUT /api/households/:id
exports.updateHousehold = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const household = await Household.findByIdAndUpdate(
        req.params.id, req.body, {new: true, runValidators: true});

    if (!household) {
      return res.status(404).json({message: 'Household not found'});
    }

    res.json(household);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete household
// @route   DELETE /api/households/:id
exports.deleteHousehold = async (req, res, next) => {
  try {
    const household = await Household.findByIdAndDelete(req.params.id);
    if (!household) {
      return res.status(404).json({message: 'Household not found'});
    }
    res.json({message: 'Household deleted successfully'});
  } catch (err) {
    next(err);
  }
};
