import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {

  const newUser = await User.create(userData);

  const { _id, name, email } = newUser.toObject();
  
  return { _id, name, email };
};

export const userServices = {
  createUserIntoDB,
};
