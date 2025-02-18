import culqi from '../config/culqi.config';

class Charge {
  static async create(chargeData) {
    try {
      const charge = await culqi.charges.createCharge({
        amount: chargeData.amount,
        currency_code: chargeData.currency,
        email: chargeData.email,
        source_id: chargeData.token
      });
      return charge;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Charge;