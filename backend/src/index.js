// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usuarioRoutes = require('./routes/userRoutes.js');
const transaccionRoutes = require('./routes/transactionRoutes.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://root:root123@cluster0.wosu09q.mongodb.net/Capitalplus?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Habilitar CORS para todas las rutas
app.use(cors({
    origin: ['http://localhost:5173', '*'], // Reemplaza con el origen de tu aplicación de React
    credentials: true,
  }));

app.get('/', (req, res) => {
    res.send('¡Backend en funcionamiento!');
  });
  

// Rutas
app.use('/', usuarioRoutes);
// Registrar las rutas relacionadas con transacciones
app.use('/transacciones', transaccionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
