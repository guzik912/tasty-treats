const fs = require('fs');
const fileDataParser = require('../utils/fileDataParser');

exports.getInquiries = async function (req, res) {
  try {
    fs.readFile('./data/inquiries.txt', (err, result) => {
      if (err) {
        throw new Error('Something went wrong, please try again.');
      }

      const inquiriesData = fileDataParser(result, '___');

      res.render('inquiries', { inquiries: inquiriesData });
    });
  } catch (err) {
    res.render('404', { error: err.message });
  }
};

exports.getInquiryForm = function (req, res) {
  res.render('form', {
    errors: false,
    message: false,
    captchaError: false,
    inputValues: false,
  });
};

exports.sendInquiryForm = async (req, res) => {
  const { name, email, message, subscribe } = req.body;
  const isSubscribed = subscribe ? 'yes' : 'no';
  const inquiryData = `${name}___${email}___${message}___${isSubscribed}\n`;

  try {
    fs.appendFile('./data/inquiries.txt', inquiryData, (err, result) => {
      if (err) {
        throw new Error('Something went wrong, please try again.');
      }

      res.render('form', {
        errors: false,
        message: 'Inquiry has been successfully sent.',
        captchaError: false,
        inputValues: false,
      });
    });
  } catch (err) {
    res.render('404', { error: err.message });
  }
};
