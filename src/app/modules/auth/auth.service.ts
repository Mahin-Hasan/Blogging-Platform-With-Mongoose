import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
// @ts-ignore
import httpStatus from 'http-status';
import config from '../../config';

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistByCustomEmail(payload.email);
  console.log('user in auth service',user);
  //no user found validation
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No User Found!');
  }
  // check if user is blocked or not
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }
  //check if user password matches
  // console.log(payload?.password, user?.password);
  // console.log(payload?.password === user?.password);
  // console.log(await User.isPasswordMatched(payload?.password, user?.password));
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match !');
  }

  // trying jwt
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  //create access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_expires_in,
  });
  return { token: accessToken };
};

export const AuthServices = {
  loginUser,
};
