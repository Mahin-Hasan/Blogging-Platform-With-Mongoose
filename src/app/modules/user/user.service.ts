import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {

  const newOrder = await User.create(userData);
  return newOrder;
};

export const userServices = {
  createUserIntoDB,
};
