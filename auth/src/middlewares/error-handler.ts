import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message)
  if(err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()})
  }
  res.status(500).send({ errors: [
      { message: 'Something went wrong.' }
    ]
  })
}