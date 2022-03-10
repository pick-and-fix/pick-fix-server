const { body } = require("express-validator");

const checkEmailValue = [
  body("email", "Please check the email").exists().isEmail(),
];

module.exports = {
  checkEmailValue,
};
