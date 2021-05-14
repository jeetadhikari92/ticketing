import { CustomError } from "./custom-errors";

export class NotFoundErrors extends CustomError {
  statusCode = 404;
  constructor() {
    super('Not found')
    Object.setPrototypeOf(this, NotFoundErrors.prototype)
  }

  serializeErrors() {
    return [{message: 'Not found'}]
  }
}