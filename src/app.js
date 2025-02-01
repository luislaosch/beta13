import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'
//importando las rutas
import productsRoute from './routes/products.route';


const app = express();

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
app.use('/products',productsRoute)

export default app;