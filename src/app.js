import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'
//importar los roles al inicio de la aplicacion 
import {createRoles} from './libs/initialSetup';
//importando las rutas
import productsRoute from './routes/products.route';
import authRoute from './routes/auth.route';

const app = express();
createRoles();

app.set('pkg',pkg)

app.use(morgan('dev'));
app.use(express.json());


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
app.use('/api/products',productsRoute)
app.use('/api/auth',authRoute)

export default app;