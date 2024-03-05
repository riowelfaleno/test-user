import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";

export class AuthMiddleware {
  public async verifyApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["api-key"];

    let localAPIKey = process.env.API_KEY;
    if (!apiKey) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send({ message: "api-key is missing" });
    }

    if (apiKey != localAPIKey) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: "Invalid api-key" });
    }

    next();
  }
}
