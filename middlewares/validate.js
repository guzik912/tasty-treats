const { validationResult } = require('express-validator');

module.exports = (validations) => {
  return async (req, res, next) => {
    const { name, email, message, subscribe } = req.body;

    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.render('form', {
      errors: errors.array(),
      message: false,
      captchaError: false,
      inputValues: {
        name,
        email,
        message,
        subscribe,
      },
    });
  };
};
