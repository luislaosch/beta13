import express from 'express';
import { paymentController } from '../controllers/payment.controller';

const router = express.Router();

router.post('/create-charge', paymentController.createCharge);

export default router;