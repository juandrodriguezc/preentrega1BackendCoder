class CartManager {
    constructor() {
        this.carts = [];
    }

    createCart() {
        const cartId = this.carts.length + 1;
        const newCart = { id: cartId, products: [] };
        this.carts.push(newCart);
        return newCart;
    }

    getCartById(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }

    addProductToCart(cartId, product) {
        const cart = this.getCartById(cartId);
        if (cart) {
            cart.products.push(product);
            console.log(`Producto "${product.nombre}" agregado al carrito ${cartId}.`);
        } else {
            console.log(`Error: Carrito con ID ${cartId} no encontrado.`);
        }
    }
}

export default CartManager;