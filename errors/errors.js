// errors/not-found-err.js

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class WrongLoginPassw extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  NotFoundError,
  ServerError,
  ValidationError,
  WrongLoginPassw,
  AccessError,
  RegistrationError,
};
