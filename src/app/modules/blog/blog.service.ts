import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchField } from './blog.constant';

// const getAllBlogsFromDB = async () => {
//   const result = await Blog.find()
//     .populate('author', '-password -role -isBlocked -createdAt -updatedAt')
//     .lean();
//   return result;
// };

//trying get All with query builder
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find()
      .populate('author', '-password -role -isBlocked -createdAt -updatedAt')
      .lean(),
    query,
  )
    .search(BlogSearchField)
    .sort()
    .filter();
  const blogs = await blogQuery.modelQuery;

  // Transform the result into the desired structure
  // const newUser = await User.create(userData);
  // console.log('All Blogs', blogs);
  // Transform the result into the desired structure
  return blogs.map(({ _id, title, content, author }) => ({
    _id,
    title,
    content,
    author,
  }));

  // const structureResponse = await blogQuery.modelQuery;
  // console.log(structureResponse);
  // const {_id,title,content,author } =structureResponse.toObject();
  // return {_id,title,content,author};
  // const result = await blogQuery.modelQuery;
  // return result;
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
  console.log('id and payload', id, payload);
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate('author', '-password -role -isBlocked -createdAt -updatedAt')
    .lean();
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = Blog.findByIdAndDelete(id);
  return result;
};
export const BlogServices = {
  getAllBlogsFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
