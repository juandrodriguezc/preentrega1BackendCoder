import { Router } from 'express';
import ProductManager from '../manager/productManager.js';

export const productRouter=Router()

const productsFile='productos.json';
const manager = new ProductManager(productsFile);

productRouter.get('/',(req,res)=>{
    const products= manager.getProduct();
    res.status(200).json(products);
})

productRouter.get('/', (req, res) => {
    const { limit, skip } = req.query;

    let resultado = manager.getProduct(); 

    if (skip && skip > 0) {
        resultado = resultado.slice(skip); 
    }

    if (limit && limit > 0) {
        resultado = resultado.slice(0, limit);
    }

    res.json(resultado);
});

productRouter.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const producto = manager.getProductById(productId);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Error 404. Producto no encontrado');
    }
});

productRouter.post('/', (req, res) => {
    const { nombre, descripcion, precio = 0, thumbnail, code, stock = 0 } = req.body;

    if (!nombre || !descripcion || precio === undefined || !thumbnail || !code || stock === undefined) {
        return res.status(400).json({ error: 'Por favor complete todos los datos del producto' });
    }

    const newProduct = manager.addProduct(nombre, descripcion, precio, thumbnail, code, stock);

    return res.status(201).json(newProduct);
});



export default productRouter;
