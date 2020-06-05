// Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vecimiento del token
process.env.CADUCIDAD_TOKEN = '48h';

// SEED de autenticación para el token
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    // urlDB = 'mongodb://localhost:27017/ToDo';
    urlDB = 'mongodb+srv://Mariec:tkG5IacnM9DoHQpM@cluster0-tfvfd.mongodb.net/ToDo?retryWrites=true&w=majority';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;