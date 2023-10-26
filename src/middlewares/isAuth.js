const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(403).json({
    ok: false,
    message: "un-authorized",
  });
};

export default isAuth;
