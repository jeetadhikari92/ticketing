import { CustomError } from "./custom-errors";

const REASON = 'Database connection issue.';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  constructor() {
    super(REASON);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  } 

  serializeErrors() {
    return [{message: REASON}];
  }
}