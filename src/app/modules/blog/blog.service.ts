import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchField } from './blog.constant';

//get All with query builder
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find()
      .populate(
        'author',
        '-password -role -isBlocked -createdAt -updatedAt -__v',
      )
      .lean(),
    query,
  )
    .search(BlogSearchField)
    .sort()
    .filter();
  const blogs = await blogQuery.modelQuery;

  // Transforming the result into the desired structure
  return blogs.map(({ _id, title, content, author }) => ({
    _id,
    title,
    content,
    author,
  }));
};

const createBlogIntoDB = async (blogData: Partial<IBlog>) => {
  const { title, content, author: authorEmail } = blogData;

  // Find the author by email
  const user = await User.findOne({ email: authorEmail });
  if (!user) {
    throw new AppError(400, 'User not found!!');
  }

  // Extract author ID
  const author = user._id;

  // Creating the blog
  const result = await Blog.create({ title, content, author });

  // Retriving author details
  const structuredDetails = await User.findById(author).select(
    '-password -role -isBlocked -createdAt -updatedAt',
  );

  // Transforming the result into the desired structure
  return {
    _id: result._id.toString(),
    title: result.title,
    content: result.content,
    author: structuredDetails,
  };
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
) => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate('author', '-password -role -isBlocked -createdAt -updatedAt -__v')
    .select('-isPublished -createdAt -updatedAt -__v')
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
