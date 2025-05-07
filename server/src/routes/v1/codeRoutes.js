import express from 'express'
import { getCppOutput } from '../../controllers/index.js';
const router = express.Router();

router.post('/run', getCppOutput);

export default router;