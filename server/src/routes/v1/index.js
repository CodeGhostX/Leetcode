import express from 'express';
const router = express.Router();
import codeRoutes from './codeRoutes.js';
import infoRoutes from './infoRoute.js';

router.use('/', codeRoutes);
router.use('/', infoRoutes);

export default router;
