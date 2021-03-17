const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiries');
const isValidate = require('../middlewares/validate');
const isRecaptched = require('../middlewares/recaptcha');
const { body } = require('express-validator');

router.get('/', inquiriesController.getInquiries);

router.get('/form', inquiriesController.getInquiryForm);

router.post(
  '/form',
  isValidate([
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name field can not be empty')
      .isLength({ min: 3 })
      .withMessage('Name should contain minimum 3 characters'),
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Email field can not be empty')
      .isEmail()
      .withMessage('Invalid email address'),
    body('message')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Message can not be empty'),
  ]),
  isRecaptched(),
  inquiriesController.sendInquiryForm
);

module.exports = router;
