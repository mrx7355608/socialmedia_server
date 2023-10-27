import validator from "validator";
import {
  badRequestError,
  forbiddenError,
  internalError,
  notFoundError,
} from "./error.services.js";
import { signupValidator, resetPasswordValidator } from "../validators/auth.js";

const AuthService = ({ usersDB, emailServices, tokenServices }) => {
  // 1) SIGNUP
  const signup = async (data) => {
    // eslint-disable-next-line
    const signupData = filterUnwantedFields(data);

    // Validate user data
    signupValidator(signupData);

    // Check if user exists
    const isUser = await usersDB.findByEmail(signupData.email);
    if (isUser) {
      return badRequestError("Email is already registered");
    }

    // Create a new user
    const userDataObject = {
      ...signupData,
      profile_picture: process.env.DEFAULT_PROFILE_PICTURE,
      cover_picture: process.env.DEFAULT_COVER_PICTURE,
      role: "user",
    };
    const newUser = await usersDB.insert(userDataObject);

    // Send verification email
    const token = tokenServices.generateToken({ userID: newUser.id });
    await emailServices.sendVerificationEmail(token, newUser.email);
    return null;
  };

  // VERIFY EMAIL
  const verifyEmail = async (token) => {
    if (!token) {
      return forbiddenError("Verification token is missing");
    }
    try {
      const payload = await tokenServices.verifyToken(token);
      const { userID } = payload;
      const user = await usersDB.findById(userID);
      // Check if user exist (extra safety check :p)
      if (!user) {
        return notFoundError("User not found");
      }
      // Verify account
      await usersDB.update(userID, { isVerified: true });
      return null;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return forbiddenError("Verification token has expired");
      }
      if (error.name === "JsonWebTokenError") {
        return forbiddenError("Invalid token");
      }
      return internalError("An un-expected error occured");
    }
  };

  // REQUEST VERIFICATION EMAIL ()
  // * NOTE: user must be logged in
  const requestVerificationEmail = async (user) => {
    // Check if user is already verified or not
    if (user.isVerified) {
      return forbiddenError("You are already a verified user");
    }
    // Send verifcation email
    const token = tokenServices.generateToken({ userID: user.id });
    await emailServices.sendVerificationEmail(token, user.email);
    return null;
  };

  // FORGOT PASSWORD
  const forgotPassword = async (email) => {
    // Check if the email is provied and valid
    if (!email) {
      return badRequestError("Please enter your email");
    }
    if (!validator.isEmail(email)) {
      return badRequestError("Invalid email");
    }

    // Check if user exists
    const user = await usersDB.findByEmail(email);
    if (!user) {
      return notFoundError("User not found");
    }

    // Send reset password email
    const token = tokenServices.generateToken({ userID: user.id });
    await emailServices.sendResetPasswordEmail(token, user.email);
    return null;
  };

  // RESET PASSWORD
  const resetPassword = async (token, data) => {
    // Check if the token is provided
    if (!token) {
      return forbiddenError("Token is missing");
    }

    // Validate token
    let payload;
    try {
      payload = await tokenServices.verifyToken(token);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return forbiddenError("Verification token has expired");
      }
      if (error.name === "JsonWebTokenError") {
        return forbiddenError("Invalid token");
      }
      return internalError("An un-expected error occured");
    }

    const { userID } = payload;
    const user = await usersDB.findById(userID);

    // Check if user exist (extra safety check :p)
    if (!user) {
      return notFoundError("User not found");
    }

    // Valdiate passwords
    resetPasswordValidator(data);

    // Update password
    await usersDB.update(userID, { password: data.password });
    return null;
  };

  // UTILITY FUNCTIONS
  function filterUnwantedFields(obj) {
    const allowedFields = [
      "firstname",
      "lastname",
      "email",
      "password",
      "confirm_password",
    ];
    Object.keys(obj).forEach((key) => {
      if (!allowedFields.includes(key)) {
        // eslint-disable-next-line
        delete obj[key];
      }
    });

    return obj;
  }

  return {
    signup,
    verifyEmail,
    requestVerificationEmail,
    forgotPassword,
    resetPassword,
  };
};

export default AuthService;
