import { badRequestError, internalError } from "./error.services.js";
import signupValidator from "../validators/auth.js";
import generateToken from "../utils/generateToken.js";

const AuthService = ({ usersDB, emailServices }) => {
  const signup = async (signupData) => {
    // Validate user data
    signupValidator(signupData);

    // Check if user exists
    const isUser = await usersDB.findByEmail(signupData.email);
    if (isUser) {
      return badRequestError("Email is already registered");
    }

    // Send verification email
    const token = generateToken();
    const isEmailSent = await emailServices.sendVerificationEmail(token);
    if (isEmailSent === false) {
      return internalError("Could not send verification email");
    }

    // Create a new user
    await usersDB.insert(signupData);
    return null;
  };

  return { signup };
};

export default AuthService;
