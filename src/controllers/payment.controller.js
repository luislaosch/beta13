import Charge from '../models/charge.model';

export const paymentController = {
  createCharge: async (req, res) => {
    try {
      const { amount, currency, email, token } = req.body;
      
      const charge = await Charge.create({
        amount,
        currency,
        email,
        token
      });
      console.log(charge);
      res.status(201).json({
        success: true,
        data: charge
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};