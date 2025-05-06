import express from 'express'
import { getOutput } from '../../controllers/index.js';
const router = express.Router();

router.post('/run', getOutput);

export default router;