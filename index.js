const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');
const rubrosRoutes = require('./routes/rubrosRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas
app.use('/api/productos', productosRoutes); //Ruta productos
app.use('/api/rubros', rubrosRoutes); //Ruta rubros

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
