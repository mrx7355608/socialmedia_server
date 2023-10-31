const notGuestsAllowed = (req, res, next) => {
  if (req.user.role === "user") {
    return next();
  }
  return res.status(403).json({
    ok: false,
    message: "un-authorized",
  });
};

export default notGuestsAllowed;
