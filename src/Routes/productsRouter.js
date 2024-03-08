import { Router } from 'express';
import ProductManager from '../manager/productManager.js';
import CartManager from '../manager/cartManager.js';

export const productsRouter = (productManager) => {
    const router = Router();

    router.get('/',(req,res)=>{
        const products = productManager.getProduct();
        res.status(200).json(products);
    });

    router.get('/', (req, res) => {
        const { limit, skip } = req.query;

        let resultado = productManager.getProduct(); 

        if (skip && skip > 0) {
            resultado = resultado.slice(skip); 
        }

        if (limit && limit > 0) {
            resultado = resultado.slice(0, limit);
        }

        res.json(resultado);
    });

    router.get('/:id', (req, res) => {
        const productId = parseInt(req.params.id);
        const producto = productManager.getProductById(productId);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Error 404. Producto no encontrado');
        }
    });

    router.post('/', (req, res) => {
        const { nombre, descripcion, precio = 0, thumbnail, code, stock = 0 } = req.body;

        if (!nombre || !descripcion || precio === undefined || !thumbnail || !code || stock === undefined) {
            return res.status(400).json({ error: 'Por favor complete todos los datos del producto' });
        }

        const newProduct = productManager.addProduct(nombre, descripcion, precio, thumbnail, code, stock);

        return res.status(201).json(newProduct);
    });

    return router;
}

export default productsRouter;