import express from 'express';
import { processPayment } from '../controllers/culqi.controller';

const router = express.Router();

router.post('/process/pay', processPayment);

export default router;