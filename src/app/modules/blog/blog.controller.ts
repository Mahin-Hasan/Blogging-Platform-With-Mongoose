// @ts-ignore
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import AppError from '../../errors/AppError';

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
console.log("Author in create blog",author);
  const result = await BlogServices.createBlogIntoDB({
    title,
    content,
    author,
  });
  //   const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
};
