import { Router } from "express";
import CartManager from "../manager/cartManager.js";
import ProductManager from "../manager/productManager.js";

export const cartsRouter = (productManager) => {
    const router = Router();
    const cartFile='carts.json'
    const cartManager=new CartManager(cartFile);

    router.get('/', (req, res) => {
        const carts = cartManager.getCarts();
        res.status(200).json(carts);
    });

    router.get('/:id', (req, res) => {
        const cartId = parseInt(req.params.id);
        const cart = cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).send('Error 404. Carrito no encontrado');
        }
    });

    router.post('/', (req, res) => {
        const newCart = cartManager.createCart()
        res.status(201).json(newCart);
    });

    router.post('/:id/products/:productId', (req, res) => {
        const cartId = parseInt(req.params.id);
        const productId = req.params.productId;

        const productToAdd = productManager.getProductById(productId); 

        if (productToAdd) {
            cartManager.addProductToCart(cartId, productToAdd);
            res.send('Producto agregado al carrito correctamente');
        } else {
            res.status(404).send('Error 404. Producto no encontrado');
        }
    });

    return router;
}

export default cartsRouter;