// @ts-ignore
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
// import { IBlog } from './blog.interface';

const getAllBlogs = catchAsync(async (req, res) => {
  console.log('Check Blogs token', req.user);
  console.log('Passed Query', req.query);
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const author = req.user?.userEmail;

 
  const structuredResult = await BlogServices.createBlogIntoDB({
    title,
    content,
    author,
  });

  // Send the response
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: structuredResult,
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
  // Find the logged in user by email
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
    statusCode: 200,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const loggedUserEmail = req.user?.userEmail;

  // Check if the blog exists
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(
      400,
      'Provided Blog Id does not exist in the Blog collection',
    );
  }

  // Find the logged-in user by email
  const userExist = await User.findOne({ email: loggedUserEmail });
  if (!userExist) {
    throw new AppError(400, 'User not found!');
  }
  const loggedUserId = userExist._id;

  const { author } = isBlogExist;
  console.log('Logged User:', loggedUserId);
  console.log('Blog author ID:', author);

  // Check if the logged user is the author of the blog
  if (!loggedUserId.equals(author)) {
    throw new AppError(
      403,
      'Cannot delete as logged user is not the Author of the blog!',
    );
  }

  await BlogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog Deleted successfully',
    statusCode: 201,
    // data: result,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
