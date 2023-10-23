import { badRequestError } from "./error.services.js";
import signupValidator from "../validators/auth.js";

const AuthService = ({ usersDB, emailServices, tokenServices }) => {
  // 1) SIGNUP
  const signup = async (signupData) => {
    // Validate user data
    signupValidator(signupData);

    // Check if user exists
    const isUser = await usersDB.findByEmail(signupData.email);
    if (isUser) {
      return badRequestError("Email is already registered");
    }

    // Create a new user
    const newUser = await usersDB.insert(signupData);

    // Send verification email
    const token = tokenServices.generateToken({ userID: newUser.id });
    await emailServices.sendVerificationEmail(token, newUser.email);
    return null;
  };

  // VERIFY EMAIL
  return { signup };
};

export default AuthService;
