import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpStatus from "http-status-codes";

export class Validator {
  public static validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errors.array()[0].msg,
      });
    }

    return;
  }
}
