const fs = require('fs');
const request = require('request');

exports.getInquiries = function (req, res) {
  const inquiryDataSchema = ['name', 'email', 'message', 'subscribe'];
  const inquiriesData = [];

  try {
    fs.readFile('./data/inquiries.txt', (err, result) => {
      let splittedLinesOfData = result.toString().split(/\r?\n/);

      for (let i = 0; i < splittedLinesOfData.length - 1; i++) {
        const splittedLine = splittedLinesOfData[i].split(',');
        const inquiry = {};

        for (let j = 0; j < splittedLine.length; j++) {
          inquiry[inquiryDataSchema[j]] = splittedLine[j];
        }

        inquiriesData.push(inquiry);
        console.log(inquiriesData);
      }

      res.render('inquiries', { inquiries: inquiriesData });
    });
  } catch (err) {
    res.render('404', { error: 'Something went wrong. Please try again.' });
  }
};

exports.getInquiryForm = function (req, res) {
  res.render('form');
};

exports.sendInquiryForm = (req, res) => {
  const captcha = req.body['g-recaptcha-response'];

  if (
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ) {
    console.log(captcha)
    return res.json({ success: false, msg: 'Please select captcha' });
  }

  // Secret key
  const secretkey = '6LfkHIMaAAAAAAly5zSoTHkglfvIl9nsqO-RbBrc';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request to VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    // If not successful
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: 'Failed captcha verification' });
    }

    // If successful
    // return res.json({ success: true, msg: 'Captcha passed' });
    const { name, email, message, subscribe } = req.body;
    console.log(req.body);
  
    const isSubscribed = subscribe ? 'yes' : 'no';
  
    const inquiryData = `${name},${email},${message},${isSubscribed}\n`;
  
    try {
      fs.appendFile('./data/inquiries.txt', inquiryData, () => {});
      res.render('form', {
        message: 'Inquiry has been successfully sent.',
      });
    } catch (err) {
      res.render('404', { error: 'Something went wrong. Please try again.' });
    }

  });

};
