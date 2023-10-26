import passport from "passport";
import AuthServices from "../services/auth.services.js";
import EmailServices from "../services/email.services.js";
import usersDB from "../data/user.data.js";
import TokenServices from "../services/token.services.js";

const authServices = AuthServices({
  usersDB,
  emailServices: EmailServices(),
  tokenServices: TokenServices(),
});

const postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    await authServices.signup(data);
    return res.status(200).json({
      message: `A verification email has been sent to ${data.email}`,
    });
  } catch (err) {
    return next(err);
  }
};

const postLogin = async (req, res, next) => {
  // eslint-disable-next-line
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (user === false) {
      return res.status(404).json({
        ok: false,
        message: "Account not found",
      });
    }
    if (info) {
      return res.status(400).json({
        ok: false,
        message: info.message,
      });
    }

    req.logIn(user, () =>
      res.status(200).json({
        ok: true,
        message: "Login successfull",
      })
    );
  })(req, res, next);
};

const postLogout = async (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(next);
    return res.status(200).json({
      ok: true,
      message: "Logout successfull",
    });
  });
};

const authControllers = {
  postSignup,
  postLogin,
  postLogout,
};

export default authControllers;
