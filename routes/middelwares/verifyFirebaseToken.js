const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

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
    if (err.code === "auth/argument-error") {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Invalid Firebase Token",
        },
      });

      return;
    }

    if (err.code === "auth/id-token-expired") {
      res.status(400).json({
        result: "fail",
        error: {
          message: "Expired Firebase Token",
        },
      });

      return;
    }

    next(createError(500, "Invalid Server Error"));
  }
};

module.exports = verifyFirebaseToken;
