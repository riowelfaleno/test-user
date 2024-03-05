import express, { NextFunction, Router, Request, Response } from "express";
import { UserController } from "./user.controller";
import multer from "multer";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { UserValidator } from "./user.validator";
import { Validator } from "../validator/validator";

/** 2MB limit */
const maxSizeFileUpload = 2 * 1024 * 1024;
const processPhotos = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSizeFileUpload },
}).array("files");

const UserRouter: Router = express.Router();
const UserControllerObj = new UserController();
const AuthMiddlewareObj = new AuthMiddleware();

UserRouter.post(
  "/register",
  AuthMiddlewareObj.verifyApiKey,
  processPhotos,
  UserValidator.validateCreateUser(),
  async (req: Request, res: Response) => {
    Validator.validateRequest(req, res);

    await UserControllerObj.createUser(req, res);
  }
);

UserRouter.get(
  "/list",
  AuthMiddlewareObj.verifyApiKey,
  async (req: Request, res: Response) => {
    Validator.validateRequest(req, res);

    await UserControllerObj.getUserList(req, res);
  }
);

UserRouter.get(
  "/detail/:user_id",
  AuthMiddlewareObj.verifyApiKey,
  async (req: Request, res: Response) => {
    Validator.validateRequest(req, res);

    await UserControllerObj.getUserDetail(req, res);
  }
);
UserRouter.patch(
  "/",
  AuthMiddlewareObj.verifyApiKey,
  processPhotos,
  UserValidator.validateUpdateUser(),
  async (req: Request, res: Response) => {
    Validator.validateRequest(req, res);

    await UserControllerObj.updateUser(req, res);
  }
);

export { UserRouter };
