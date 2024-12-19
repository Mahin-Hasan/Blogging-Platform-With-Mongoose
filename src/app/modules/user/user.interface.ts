import { Model } from 'mongoose';

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
