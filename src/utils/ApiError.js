class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

export default ApiError;
