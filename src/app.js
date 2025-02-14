//importar dependecias
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import config from './config';
//importar los roles al inicio de la aplicacion (crear roles por defecto)
import {createRoles} from './libs/initialSetup';
//importamos rutas
import productsRoute from './routes/products.route';
import authRoute from './routes/auth.route';
import usersRoute from './routes/user.route'
import cartRoute from './routes/cart.route'
import culqiRoute from './routes/culqi.route'; // ruta para Culqi

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


//definiendo rutas
app.use('/api/products',productsRoute);
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/cart', cartRoute);
app.use('/api/process', culqiRoute); // Usando la nueva ruta de Culqi

export default app;