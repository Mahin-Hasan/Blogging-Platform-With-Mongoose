import express from 'express';

const router = express.Router();

router.get('/blogs');

// also add admin/blog routes
export const BlogRoutes = router;
