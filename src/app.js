// import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import config from './config';
//importar los roles al inicio de la aplicacion 
import {createRoles} from './libs/initialSetup';
//importando las rutas

const Culqi = require('culqi-node');
const culqi = new Culqi({
    // privateKey: process.env.privateKey,
    // publicKey: process.env.publicKey,
    privateKey: config.PRIVATEKEY,
    publicKey: config.PUBLICKEY,
    pciCompliant: true
});

import productsRoute from './routes/products.route';
import authRoute from './routes/auth.route';
import usersRoute from './routes/user.route'
import cartRoute from './routes/cart.route'
const app = express();
//creando roles por defecto
createRoles();

app.set('pkg',pkg)

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: '*'}));


app.get('/',(req,res)=>{
    console.log("hola beta 13");
    res.json({
        name:app.get('pkg').name,
        autor:app.get('pkg').author,
        proyecto:app.get('pkg').description,
        version:app.get('pkg').version
    });
})


app.post('/api/process/pay', async (req, res) => {
    const producto = req.body;
    const mires = await culqi.tokens.createToken({
        card_number: producto.creditcard,
        cvv: producto.cvv,
        expiration_month: producto.month,
        expiration_year: producto.year,
        email: producto.email
    }).then( (data)=>{
      //  console.log(data);
        try {
             culqi.charges.createCharge({
                amount: producto.amount,
                currency_code: producto.currency_code,
                email: producto.email,
                installments: producto.installments,
                description: producto.description,
                source_id: data.id
            }).then((respuesta)=>{
                console.log(respuesta);
                res.send({ message: respuesta });
            }).catch(err=>{
                res.send({ message: err});
            })
        } catch (error) {
            res.send({ message: error});
        }
    }).catch(err=>{
        res.send({ message: err});
    })
})


//definiendo rutas
app.use('/api/products',productsRoute);
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/cart', cartRoute);

export default app;