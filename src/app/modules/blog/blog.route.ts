import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get('/blogs', auth(USER_ROLE.user), BlogControllers.getAllBlogs);
router.post(
  '/blogs',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.patch(
  '/blogs/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete('/blogs/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);

// also add admin/blog routes
export const BlogRoutes = router;
