const request = require('request');

module.exports = () => {
  return async (req, res, next) => {
    const { name, email, message, subscribe } = req.body;
    const captcha = req.body['g-recaptcha-response'];

    if (captcha === undefined || captcha === '' || captcha === null) {
      return res.render('form', {
        errors: false,
        message: false,
        success: false,
        captchaError: 'Please select captcha',
        inputValues: { name, email, message, subscribe },
      });
    }

    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

    try {
      request(verifyUrl, (err, response, body) => {
        if (err) {
          throw new Error('Something went wrong, please try again.');
        }

        body = JSON.parse(body);

        if (body.success !== undefined && body.success !== true) {
          return res.render('form', {
            errors: false,
            message: false,
            success: false,
            captchaError: 'Failed captcha verification.',
            inputValues: { name, email, message, subscribe },
          });
        } else {
          next();
        }
      });
    } catch (err) {
      res.render('404', { error: err.message });
    }
  };
};
