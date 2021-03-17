const request = require('request');

module.exports = () => {
  return async (req, res, next) => {
    const captcha = req.body['g-recaptcha-response'];

    if (
      captcha === undefined ||
      captcha === '' ||
      captcha === null
    ) {
      console.log('nie wybrales captcha')
      return res.render('form', { msg: 'Please select captcha' });
    }

    // Secret key
    const secretkey = '6LfkHIMaAAAAAAly5zSoTHkglfvIl9nsqO-RbBrc';

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // Make Request to VerifyURL
    request(verifyUrl, (err, response, body) => {
      body = JSON.parse(body);

      // If not successful
      if (body.success !== undefined && !body.success) {
        console.log('lipa z weryfikacja captcha')
        return res.render({ msg: 'Failed captcha verification. Please try again' });
      }

      // If successful
      // return res.json({ success: true, msg: 'Captcha passed' });
      next();
    });







  //   // Secret key
  // const secretkey = '6Ld1FIMaAAAAADvlHpoD23TH6njcfdGWyygiIcN-';

  // // Verify URL
  // const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // return fetch(verifyUrl, { method: 'POST' })
  //   .then(res => {
  //     res.json();
  //     console.log(res);
  //   })
  //   .then(json => res.send(json))
  // };
};
};
