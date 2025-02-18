//importar dependecias
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser'; // Para poder leer los datos que vienen en el body
import pkg from '../package.json';
import config from './config';
//importar los roles al inicio de la aplicacion (crear roles por defecto)
import {createRoles} from './libs/initialSetup';
//importamos rutas
import productsRoute from './routes/products.route';
// import categoriesRoute from './routes/categoryProduct.route';
import authRoute from './routes/auth.route';
import usersRoute from './routes/user.route'
import cartRoute from './routes/cart.route';
import culqiRoute from './routes/culqi.route'; // ruta para Culqi
import paymentRoute from './routes/payment.routes';
// import paymentRoute from './routes/payment.route'; // Ruta para el controlador de pagos

const app = express();
//creando roles por defecto
createRoles();

app.set('pkg',pkg)

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    console.log("hola beta 13");
    res.json({
        name:app.get('pkg').name,
        autor:app.get('pkg').author,
        proyecto:app.get('pkg').description,
        version:app.get('pkg').version
    });
})


//definiendo rutas
// app.use('/api/categoriesProducts',categoriesRoute);
app.use('/api/products',productsRoute);
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/cart', cartRoute);
app.use('/api/process', culqiRoute); // Usando la nueva ruta de Culqi

app.use('/api/payments', paymentRoute); // Usando la nueva ruta de pagos

export default app;