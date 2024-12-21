import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUser = async (userId: string) => {
  //add block user validation later
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(400, 'User not found!!');
  }

  return user;
};
const deleteBlogFromDB = async (id: string) => {
  const result = Blog.findByIdAndDelete(id);
  return result;
};
export const AdminServices = {
  blockUser,
  deleteBlogFromDB,
};
