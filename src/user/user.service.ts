import {
  CreateUserParam,
  GetUserDetailParam,
  GetUserListParam,
  UpdateUserParam,
} from "./user.interface";
import userModel, { IUser, IUserLean } from "./user.model";
import { FilterQuery } from "mongoose";

export class UserService {
  public async createUser(param: CreateUserParam) {
    /** Check if email exist */
    const checkEmailExist = await userModel.findOne({
      email: param.email,
      isDeleted: false,
    });
    if (checkEmailExist) {
      throw new Error("Email already exists");
    }

    console.log(`Creating user for email ${param.email}`);
    const createUser = await userModel.create(param);

    return createUser;
  }

  public async getUserList(param: GetUserListParam) {
    const offset = param.offset ? param.offset : 0;
    const limit = param.limit ? param.limit : 30;
    const sort = param.orderBy ? param.orderBy : "name";
    const order = param.sort == "desc" ? -1 : 1;

    const filter: FilterQuery<IUser> = {
      isDeleted: false,
    };

    if (param.queryBy) {
      filter["$or"] = [
        {
          email: { $regex: param.queryBy, $options: "i" },
        },
        {
          name: { $regex: param.queryBy, $options: "i" },
        },
      ];
    }

    console.log("Getting user list with filter", filter);
    const getUserList = await userModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ [sort]: order })
      .select(["-password", "-creditCardCvv"]);

    const listing = getUserList.map((obj) => {
      return {
        _id: obj._id,
        name: obj.name,
        address: obj.address,
        email: obj.email,
        photos: obj.photos,
        creditCard: {
          type: obj.creditCardType,
          number: obj.creditCardNumber,
          name: obj.creditCardName,
          expired: obj.creditCardExpiry,
        },
      };
    });

    const count = await userModel.countDocuments(filter);
    console.log(`Total user found: ${count}`);

    const response = {
      rows: listing,
      count,
    };

    return response;
  }

  public async getUserDetail(param: GetUserDetailParam) {
    const getUserDetail = await userModel
      .findById(param.userId)
      .select(["-password", "-creditCardCvv"]);
    if (!getUserDetail) {
      throw new Error("User not found");
    }

    const response = {
      _id: getUserDetail._id,
      name: getUserDetail.name,
      address: getUserDetail.address,
      email: getUserDetail.email,
      photos: getUserDetail.photos,
      creditCard: {
        type: getUserDetail.creditCardType,
        number: getUserDetail.creditCardNumber,
        name: getUserDetail.creditCardName,
        expired: getUserDetail.creditCardExpiry,
      },
    };

    return response;
  }

  public async updateUser(param: UpdateUserParam) {
    console.log(`Updating user ${param.userId}`);
    const createUser = await userModel.findOneAndUpdate(
      { _id: param.userId, isDeleted: false },
      param
    );

    return createUser;
  }
}
