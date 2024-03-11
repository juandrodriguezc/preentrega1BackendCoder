//imports
import express from "express";
import productsRouter from "./Routes/productsRouter.js"
import cartsRouter from "./Routes/cartsRouter.js"
import ProductManager from "./manager/productManager.js"; 
import { rutaProductos } from "./utils.js";
const PORT = 8080;
const app = express();
const productManager = new ProductManager(rutaProductos) 

app.use(express.json());

//Agregando los routers al app
app.use("/api/products", productsRouter(productManager));
app.use("/api/carts", cartsRouter(productManager));

app.get('/', (req, res) => {
    res.send('Servidor con Express');
});

app.get('*', (req, res) => {
    res.status(404).send('Error. 404 Not Found');
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});