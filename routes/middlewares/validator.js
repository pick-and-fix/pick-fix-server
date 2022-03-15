const { validationResult } = require("express-validator");

const { RESULT_MESSAGE } = require("../../constants/response");

function validator(validations) {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      result: RESULT_MESSAGE.fail,
      error: {
        message: errors.array()[0].msg,
      },
    });
  };
}

module.exports = validator;
