import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const applicationRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
