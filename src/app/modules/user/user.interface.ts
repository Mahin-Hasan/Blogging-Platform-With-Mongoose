import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

//for using statics
export interface UserModel extends Model<IUser> {
  isUserExistByCustomEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
// For Authorization
export type TUserRole = keyof typeof USER_ROLE;
