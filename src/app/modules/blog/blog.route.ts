import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get('/blogs', auth(USER_ROLE.admin), BlogControllers.getAllBlogs);
router.post('/blogs',auth(USER_ROLE.user),validateRequest(BlogValidation.blogValidationSchema), BlogControllers.createBlog);


// also add admin/blog routes
export const BlogRoutes = router;
