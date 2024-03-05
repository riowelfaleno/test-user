import { Request, Response } from "express";
import { UserService } from "./user.service";
import HttpStatus from "http-status-codes";
import { PasswordHelper } from "../password/password.helper";
import userModel from "./user.model";

export class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();

    this.createUser = this.createUser.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  public async createUser(req: Request, res: Response) {
    try {
      const hashedPassword = await PasswordHelper.hashPassword(
        req.body.password
      );

      const photosPath = [];
      if (req.files && Number(req.files.length) > 0) {
        if (Array.isArray(req.files)) {
          for (const file of req.files) {
            const filePath = `${req.body.name}/${file.originalname}`;
            photosPath.push(filePath);
          }
        }
      }

      const createUserParam = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
        photos: photosPath,
        creditCardType: req.body.creditcard_type,
        creditCardNumber: req.body.creditcard_number,
        creditCardName: req.body.creditcard_name,
        creditCardExpiry: req.body.creditcard_expired,
        creditCardCvv: req.body.creditcard_cvv,
      };

      const createUser = await this.userService.createUser(createUserParam);
      return res.send({ user_id: createUser._id });
    } catch (error: any) {
      console.error({ error: error.message });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong. Please try again later." });
    }
  }

  public async getUserList(req: Request, res: Response) {
    try {
      const getUserListParam = {
        queryBy: req.query.q as string,
        orderBy: req.query.ob as string,
        sort: req.query.sb as string,
        offset: Number(req.query.of),
        limit: Number(req.query.lt),
      };

      const userListing = await this.userService.getUserList(getUserListParam);

      return res.send(userListing);
    } catch (error: any) {
      console.error({ error: error.message });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong. Please try again later." });
    }
  }

  public async getUserDetail(req: Request, res: Response) {
    try {
      const userListing = await this.userService.getUserDetail({
        userId: req.params.user_id,
      });

      return res.send(userListing);
    } catch (error: any) {
      console.error({ error: error.message });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong. Please try again later." });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      let hashedPassword;
      if (req.body.password) {
        hashedPassword = await PasswordHelper.hashPassword(req.body.password);
      }

      const findUser = await userModel.findOne({
        _id: req.body.user_id,
        isDeleted: false,
      });
      if (!findUser) {
        throw new Error("User not found");
      }

      const photosPath = findUser.photos ? findUser.photos : [];
      if (req.files && Number(req.files.length) > 0) {
        if (Array.isArray(req.files)) {
          for (const file of req.files) {
            const filePath = `${findUser.name}/${file.originalname}`;
            photosPath.push(filePath);
          }
        }
      }

      const updateUserParam = {
        userId: req.body.user_id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
        photos: photosPath,
        creditCardType: req.body.creditcard_type,
        creditCardNumber: req.body.creditcard_number,
        creditCardName: req.body.creditcard_name,
        creditCardExpiry: req.body.creditcard_expired,
        creditCardCvv: req.body.creditcard_cvv,
      };

      await this.userService.updateUser(updateUserParam);

      return res.send({ success: "true" });
    } catch (error: any) {
      console.error({ error: error.message });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong. Please try again later." });
    }
  }
}
