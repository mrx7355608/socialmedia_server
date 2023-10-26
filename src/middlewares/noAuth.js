const noAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.status(403).json({
    ok: false,
    message: "You are already logged in",
  });
};

export default noAuth;
