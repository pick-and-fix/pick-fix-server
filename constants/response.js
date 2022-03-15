exports.ERROR_TYPE = {
  validationError: "validationError",
  authError: "auth/argument-error",
  firebaseExpiredToken: "auth/id-token-expired",
  expiredJWT: "jwt expired",
  invalidJWT: "invalid token",
};

exports.ERROR_MESSAGE = {
  invalidServerError: "Invalid Server Error",
  databaseError: "Database Error",
  notFoundEmail: "Not Found Email",
  notValidObject: "Not Valid ObjectId",
  invalidFirebaseToken: "Invalid Firebase Token",
  expiredFirebaseToken: "Expired Firebase Token",
  expiredJwtToken: "Token is expired",
  invalidJwtToken: "invalid Verify Token",
};

exports.RESULT_MESSAGE = {
  success: "success",
  fail: "fail",
};

exports.DATA_MESSAGE = {
  ongoing: "ongoing",
};
