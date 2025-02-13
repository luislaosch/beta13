import culqi from '../configCq/culqi.config';

export const processPayment = async (req, res) => {
    const producto = req.body;
    try {
        const token = await culqi.tokens.createToken({
            card_number: producto.creditcard,
            cvv: producto.cvv,
            expiration_month: producto.month,
            expiration_year: producto.year,
            email: producto.email
        });

        const charge = await culqi.charges.createCharge({
            amount: producto.amount,
            currency_code: producto.currency_code,
            email: producto.email,
            installments: producto.installments,
            description: producto.description,
            source_id: token.id
        });

        res.send({ message: charge });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};