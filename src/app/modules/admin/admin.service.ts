import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUser = async (userId: string) => {
  //add block user validation later
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(400, 'User not found in collection!!');
  }
  //send user already blocked 
  if (isUserExist.isBlocked === true) {
    throw new AppError(400, 'User is already Blocked!!');
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(400, 'Failed to Update User Role!!');
  }

  return user;
};
const deleteBlogFromDB = async (id: string) => {
  //check if blog exist
  const isBlogExist = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError(
      400,
      'Provided Blog Id does not exist in Blog collection',
    );
  }
  const result = Blog.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(400, 'Failed to delete user');
  }
  return result;
};
export const AdminServices = {
  blockUser,
  deleteBlogFromDB,
};
