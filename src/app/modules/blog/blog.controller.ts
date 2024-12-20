// @ts-ignore
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';

const getAllBlogs = catchAsync(async (req, res) => {
  console.log('Check Blogs token', req.user);

  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  console.log('In create blog', req.user);
  // Attach logged-in user as the author
  const author = req.user?.userEmail;
  console.log('Author in create blog', author);
  const result = await BlogServices.createBlogIntoDB({
    title,
    content,
    author, // passed user Email
  });
  //   const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const loggedUserEmail = req.user?.userEmail;

  //check if searched Blog exist
  const isBlogExist = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError(
      400,
      'Provided Blog Id does not exist in Blog collection',
    );
  }
  // Find the logged-in user by email
  const userExist = await User.findOne({ email: loggedUserEmail });
  if (!userExist) {
    throw new AppError(400, 'User not found!');
  }
  const loggedUserId = userExist._id;
  //check if logged user created any blog
  const blog = await Blog.findOne({ author: loggedUserId });
  if (!blog) {
    throw new AppError(404, 'logged User does not posted any blog');
  }

  const { author } = isBlogExist;
  // const { author } = blog;
  console.log('Logged User:', loggedUserId);
  console.log('Blog author ID:', author);
  if (!loggedUserId.equals(author)) {
    throw new AppError(
      404,
      'Cannot update as logged user is not the Author of the blog!',
    );
  }
  const updatedBlog = req.body;
  console.log('Updated Blog:', updatedBlog);
  console.log('Current User:', req.user);
  const result = await BlogServices.updateBlogIntoDB(id, updatedBlog);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 201,
    data: result,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
};
