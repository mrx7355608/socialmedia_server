import { badRequestError } from "./error.services.js";
import signupValidator from "../validators/auth.js";

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
    };
    const newUser = await usersDB.insert(userDataObject);

    // Send verification email
    const token = tokenServices.generateToken({ userID: newUser.id });
    await emailServices.sendVerificationEmail(token, newUser.email);
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

  return { signup };
};

export default AuthService;
