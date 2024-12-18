import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.route';

const router = Router();

const applicationRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router