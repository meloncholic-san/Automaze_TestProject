import { Router } from "express";
import taskRoutes from "./taskRoutes.js"
import authRoutes from "./authRoutes.js"
const router = Router();


router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);

export default router;
