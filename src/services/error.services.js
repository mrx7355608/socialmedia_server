import ApiError from "../utils/ApiError.js";

const badRequestError = (message) => {
  throw new ApiError(message, 400);
};

const unauthorizedError = (message) => {
  throw new ApiError(message, 401);
};

const forbiddenError = (message) => {
  throw new ApiError(message, 403);
};

const notFoundError = (message) => {
  throw new ApiError(message, 404);
};

const limitReachedError = (message) => {
  throw new ApiError(message, 429);
};

const internalError = (message) => {
  throw new ApiError(message, 500);
};

export {
  notFoundError,
  badRequestError,
  internalError,
  forbiddenError,
  unauthorizedError,
  limitReachedError,
};
