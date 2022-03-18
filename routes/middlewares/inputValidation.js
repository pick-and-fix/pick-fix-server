const { body } = require("express-validator");

const {
  INPUT_VALIDATION_TYPE,
  INPUT_VALIDATION_MESSAGE,
} = require("../../constants/validation");

const checkEmailValue = [
  body(INPUT_VALIDATION_TYPE.email, INPUT_VALIDATION_MESSAGE.emailError)
    .exists()
    .isEmail(),
];

module.exports = {
  checkEmailValue,
};
