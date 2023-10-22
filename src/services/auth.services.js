import { badRequestError } from "./error.services.js";
import signupValidator from "../validators/auth.js";

const AuthService = ({ usersDB }) => {
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
    return newUser;
  };

  return { signup };
};

export default AuthService;
