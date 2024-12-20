import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

//
const createBlogIntoDB = async (blogData: Partial<IBlog>): Promise<IBlog> => {
  //   const { title, content, author } = blogData;
  //   console.log('DATA OUTPUT: ',title,content,author);
  const title = blogData.title;
  const content = blogData.content;
  console.log('in blog service', blogData.author);
  const user = await User.findOne({ email: blogData.author });
  if (!user) {
    throw new AppError(400, 'User not found!!');
  }
  console.log('User found:', user);
  const author = user._id;

  console.log('User found:', user);
  console.log('User ID:', author);

  const dataModel = { title, content, author };
  const result = await Blog.create(dataModel);
  //   const result = await Blog.create(blogData);

  return result;
};

export const BlogServices = {
  getAllBlogsFromDB,
  createBlogIntoDB,
};
