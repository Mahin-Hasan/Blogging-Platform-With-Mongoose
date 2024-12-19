import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.get('/blogs', auth(), BlogControllers.getAllBlogs);


// also add admin/blog routes
export const BlogRoutes = router;
