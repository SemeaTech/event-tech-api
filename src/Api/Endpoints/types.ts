import { Request } from "express";
import { User } from "./user/entity/user.entity";

export interface ICustomRequest extends Request {
  user: User;
}