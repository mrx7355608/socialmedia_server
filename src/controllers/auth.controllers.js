import AuthServices from "../services/auth.services.js";
import EmailServices from "../services/email.services.js";
import usersDB from "../data/user.data.js";

const authServices = AuthServices({
  usersDB,
  emailServices: EmailServices()
});

const postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    await authServices.signup(data);
    return res.status(200).json({
      message: `A verification email has been sent to ${data.email}`
    });
  } catch (err) {
    return next(err);
  }
};

const authControllers = {
  postSignup
};

export default authControllers;
