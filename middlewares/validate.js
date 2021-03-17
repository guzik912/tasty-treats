const { validationResult } = require('express-validator');

module.exports = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    
    res.render('form', { "errors": errors.array() });
    console.log(errors.array())
    // return res.status(400).json({ errors: errors.array() });
  };
};