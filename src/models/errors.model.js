export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectionError";
  }
}

export class ValidationError extends Error {
  constructor(message, emptyFields) {
    super(message);
    this.name = "ValidationError";
    this.emptyFields = emptyFields;
  }
}
