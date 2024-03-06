import express from "express";
import productsRouter from "./Routes/productsRouter.js"
import cartsRouter from "./Routes/cartsRouter.js"

const PORT = 8080;
const app = express();

app.use(express.json());

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)


app.get('/', (req, res) => {
    res.send('Servidor con Express');
});

app.get('*', (req, res) => {
    res.status(404).send('Error. 404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});


