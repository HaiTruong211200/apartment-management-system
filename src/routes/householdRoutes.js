const express = require('express');
const {body} = require('express-validator');
const householdController = require('../controllers/householdController');

const router = express.Router();

/**
 * @route POST /api/households
 * @desc Create a new household
 */
router.post(
    '/',
    [
      body('apartmentNumber')
          .notEmpty()
          .withMessage('Apartment number is required'),
      body('ownerName').notEmpty().withMessage('Owner name is required'),
      body('contact.phone').notEmpty().withMessage('Phone is required'),
      body('contact.email').isEmail().withMessage('Valid email is required'),
    ],
    householdController.createHousehold);

/**
 * @route GET /api/households
 * @desc List households (supports pagination & search)
 */
router.get('/', householdController.getHouseholds);

/**
 * @route GET /api/households/:id
 * @desc Get household by ID
 */
router.get('/:id', householdController.getHouseholdById);

/**
 * @route PUT /api/households/:id
 * @desc Update household
 */
router.put(
    '/:id',
    [
      body('contact.email')
          .optional()
          .isEmail()
          .withMessage('Valid email is required'),
    ],
    householdController.updateHousehold);

/**
 * @route DELETE /api/households/:id
 * @desc Delete household
 */
router.delete('/:id', householdController.deleteHousehold);

module.exports = router;
