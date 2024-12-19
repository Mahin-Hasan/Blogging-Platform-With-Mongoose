import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const applicationRoutes = [
  {
    path: '',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router