import Cart from "../models/Cart"
import Product from "../models/Product"
// import User from "../models/User";


// Obtener carrito de un usuario
export const getCartByUserId = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.userId}).populate("products.product");
      if (!cart) return res.status(404).json({ message: "no registered cart" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Agregar producto al carrito
  export const addProductToCart = async (req, res) => {
    // try {
    //   const { userId, productId, quantity } = req.body;
    //   let cart = await Cart.findOne({ user: userId });
  
    //   const product = await Product.findById(productId);
    //   if (!product) return res.status(404).json({ message: "no registered product" });
  
    //   if (!cart) {
    //     cart = new Cart({ user: userId, products: [], totalAmount: 0 });
    //   }
  
    //   const existingProduct = cart.products.find((p) => p.product.toString() === productId);
    //   if (existingProduct) {
    //     existingProduct.quantity += quantity;
    //   } else {
    //     cart.products.push({ product: productId, quantity });
    //   }
  
    //   cart.payAmount = cart.products.reduce((sum, item) => sum + item.quantity * product.price, 0);
    //   await cart.save();
      
    //   res.status(200).json(cart);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }

    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;  // Obtenido del token
    
        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "no registered product" });
    
        if (!cart) {
          cart = new Cart({ user: userId, products: [] });
        }
    
        const existingProduct = cart.products.find((p) => p.product.toString() === productId);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ product: productId, quantity });
        }
    
        cart.payAmount = cart.products.reduce((sum, item) => sum + item.quantity * product.price, 0);
        await cart.save();
        
        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  
  // Eliminar producto del carrito
  export const removeProductFromCart = async (req, res) => {
    // try {
    //   const { userId, productId } = req.params;
    //   let cart = await Cart.findOne({ user: userId });
  
    //   if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
  
    //   cart.products = cart.products.filter((p) => p.product.toString() !== productId);
    //   cart.payAmount = cart.products.reduce(async (sum, item) => {
    //     const product = await Product.findById(item.product);
    //     return sum + item.quantity * product.price;
    //   }, 0);
  
    //   await cart.save();
    //   res.json(cart);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }

    try {
        // const { productId } = req.params;
        const { productId } = req.body;
        const userId = req.userId;  // Obtenido desde el token
    
        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "no registered cart" });
    
        // Filtramos los productos para eliminar el seleccionado
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
    
        // Obtenemos los productos restantes para calcular el total correctamente
        const productDetails = await Promise.all(cart.products.map(async (p) => {
          const product = await Product.findById(p.product);
          return product ? product.price * p.quantity : 0;
        }));
    
        // Sumamos los precios para actualizar el total
        cart.payAmount = productDetails.reduce((sum, price) => sum + price, 0);
    
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

  };
  
  // Vaciar carrito
  export const clearCart = async (req, res) => {
    try {
    //   const { userId } = req.params;
      const userId = req.userId;  // Obtenido desde el token
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) return res.status(404).json({ message: "no registered cart" });
  
      cart.products = [];
      cart.payAmount = 0;
      await cart.save();
  
      res.json({ message: "Clear cart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };