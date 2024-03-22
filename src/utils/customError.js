class CustomError extends Error {
  constructor(errMsg, statusCode, source) {
    super(errMsg);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.source = source;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
