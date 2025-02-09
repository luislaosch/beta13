import Cart from "../models/Cart"
import Product from "../models/Product"


// Obtener carrito de un usuario
export const getCartByUserId = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.userId }).populate("products.product");
      if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Agregar producto al carrito
  export const addProductToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      let cart = await Cart.findOne({ user: userId });
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  
      if (!cart) {
        cart = new Cart({ user: userId, products: [], totalAmount: 0 });
      }
  
      const existingProduct = cart.products.find((p) => p.product.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
  
      cart.totalAmount = cart.products.reduce((sum, item) => sum + item.quantity * product.price, 0);
      await cart.save();
      
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Eliminar producto del carrito
  export const removeProductFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  
      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      cart.totalAmount = cart.products.reduce(async (sum, item) => {
        const product = await Product.findById(item.product);
        return sum + item.quantity * product.price;
      }, 0);
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Vaciar carrito
  export const clearCart = async (req, res) => {
    try {
      const { userId } = req.params;
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  
      cart.products = [];
      cart.totalAmount = 0;
      await cart.save();
  
      res.json({ message: "Carrito vaciado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };