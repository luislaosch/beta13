import 'dotenv/config';  // Carga las variables de entorno automáticamente
import app from './app'
import './database'

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));