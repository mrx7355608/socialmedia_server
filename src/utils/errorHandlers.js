import ApiError from "./ApiError.js";

const catch404 = (req, res, next) => next(new ApiError("Page not found", 404));

// eslint-disable-next-line
const globalErrorHandler = (err, _req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "An un-expected error occured";

  const env = process.env.NODE_ENV;
  if (env === "production") {
    res.status(status).json({ error: message });
  } else {
    res.status(status).json({
      error: message,
      stack: err.stack,
    });
  }
};

export { catch404, globalErrorHandler };
