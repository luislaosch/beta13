// import { token } from 'morgan';
import culqi from '../configCq/culqi.config';
// import Culqi from 'culqi-node';

export const processPayment = async (req, res) => {
    const producto = req.body;
    const {card_number, cvv, expiration_month, expiration_year, email} = req.body;
    
    // const {}} = req.body;
    // if(!producto)console.log("producto vacio");
    // console.log (producto);
    console.log(card_number, cvv, expiration_month, expiration_year, email);
    // console.log(producto.creditcard);
   
    try {
        // const token = await culqi.tokens.createToken({
        await culqi.tokens.createToken({
            // card_number: "4111111111111111",
            // cvv: "221",
            // expiration_month: "11",
            // expiration_year: "2025",
            // email: "aasda@email.com"
            
            card_number: card_number,
            cvv: cvv,
            expiration_month: expiration_month,
            expiration_year: expiration_year,
            email: email
        }).then(async token=>{
            const charge = await culqi.charges.createCharge({
                amount: producto.amount*100,
                currency_code: 'PEN',
                email: producto.email,
                installments: producto.installments,
                description: producto.description,
                source_id: token.id
            }).then(data=>{
                res.send({ message: charge });
            }).catch(error=>{console.log( error)});

    
        }).catch(error=>{console.log(error)}) ;

        // console.log(token);

        // const charge = await culqi.charges.createCharge({
        //     amount: producto.amount,
        //     currency_code: producto.currency_code,
        //     email: producto.email,
            // installments: producto.installments,
        //     description: producto.description,
        //     source_id: token.id
        // });

        // res.send({ message: charge });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

// export const processPayment = async (req, res) => {
//     const producto = req.body;
//     console.log(producto);
//     try {
//         const token = await culqi.tokens.createToken({
//             card_number: producto.creditcard,
//             cvv: producto.cvv,
//             expiration_month: producto.month,
//             expiration_year: producto.year,
//             email: producto.email
//         });
//         console.log(token);
//         const charge = await culqi.charges.createCharge({
//             amount: producto.amoun*100,
//             // currency_code: producto.currency_code,
//             currency_code: 'PEN',
//             email: producto.email,
//             installments: producto.installments,
//             description: producto.description,
//             source_id: token.id
//         });
//         console.log(charge);
//         res.send({ message: charge });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };