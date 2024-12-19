import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistByCustomEmail(payload.email);
  console.log(user);

  return user;
};

export const AuthServices = {
  loginUser,
};
