import { CustomError } from "./custom-errors";

export class BadRequestErrors extends CustomError {

  statusCode = 400;
  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestErrors.prototype)
  }

  serializeErrors() {
    return [{message: this.message}]
  }
}