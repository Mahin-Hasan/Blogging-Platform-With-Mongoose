import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const getAllBlogsFromDB = async () => {
  const result = await Blog.find()
    .populate('author', '-password -role -isBlocked -createdAt -updatedAt')
    .lean();
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

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  // loggerUser: JwtPayload,
) => {
  // const isBlogExist = await Blog.findById(id);

  // if (!isBlogExist) {
  //   throw new AppError(400, 'Provided Blog Id does not exist in Blog collection');
  // }
  // console.log(`id: ${id} payload: ${payload} loggedUser: ${loggerUser}`);
  console.log('id and payload', id, payload);
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('author', '-password -role -isBlocked -createdAt -updatedAt')
  .lean();
  return result;
};

export const BlogServices = {
  getAllBlogsFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
};
