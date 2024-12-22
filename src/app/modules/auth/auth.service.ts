import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
// @ts-ignore
import httpStatus from 'http-status';
import config from '../../config';

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistByCustomEmail(payload.email);
  console.log('user in auth service', user);
  //no user found validation
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }
  // check if user is blocked or not
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }
  //Check if provided password matches with the stored database
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(401, 'Invalid credentials');
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
  // return { token: `Bearer ${accessToken}` };
  return { token: accessToken };
};

export const AuthServices = {
  loginUser,
};
