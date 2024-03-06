import { Router } from "express";
import CartManager from "../manager/cartManager.js";
import ProductManager from "../manager/productManager.js";

export const cartRouter= Router()

const cartFile='carts.json'
const cartManager=new CartManager(cartFile)
const productManager=new ProductManager('productos.json');


cartRouter.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).json({carts:"Ok"});
})

cartRouter.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Error 404. Carrito no encontrado');
    }
});

cartRouter.post('/', (req, res) => {
    const newCart = cartManager.createCart()
    res.status(201).json(newCart);
});

cartRouter.post('/:id/products/:productId', (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = req.params.productId;
    
    const productToAdd = productManager.getProductById(productId); 

console.log(productToAdd);


    if (productToAdd) {
        cartManager.addProductToCart(cartId, productToAdd);
        res.send('Producto agregado al carrito correctamente');
    } else {
        res.status(404).send('Error 404. Producto no encontrado');
    }
});

export default cartRouter;