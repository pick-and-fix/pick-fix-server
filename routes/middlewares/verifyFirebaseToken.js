const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

const {
  ERROR_TYPE,
  RESULT_MESSAGE,
  ERROR_MESSAGE,
} = require("../../constants/response");

const verifyFirebaseToken = async (req, res, next) => {
  const firebaseToken = req.body.headers.Authorization.split("Bearer ")[1];

  try {
    const client = new OAuth2Client(process.env.FIREBASE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: firebaseToken,
      audience: process.env.FIREBASE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    res.locals.userInfo = { email: payload.email, name: payload.name };

    next();

    return;
  } catch (err) {
    if (err.code === ERROR_TYPE.authError) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.invalidFirebaseToken,
        },
      });

      return;
    }

    if (err.code === ERROR_TYPE.firebaseExpiredToken) {
      res.status(400).json({
        result: RESULT_MESSAGE.fail,
        error: {
          message: ERROR_MESSAGE.expiredFirebaseToken,
        },
      });

      return;
    }

    next(createError(500, ERROR_MESSAGE.invalidServerError));
  }
};

module.exports = verifyFirebaseToken;
