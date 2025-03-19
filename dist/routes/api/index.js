import { Router } from "express";
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
// localhost/api/users
router.use('/users', userRoutes);
// localhost/api/thoughts
router.use('/thoughts', thoughtRoutes);
export default router;
