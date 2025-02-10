import Cart from "../models/Cart"
import Product from "../models/Product"

// Obtener carrito de un usuario
export const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("products.product");
    if (!cart) return res.status(404).json({ message: "no registered cart" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {

  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Obtenido del token de autenticación

    // Buscar el carrito del usuario
    let cart = await Cart.findOne({ user: userId });

    // Verificar si el producto existe
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "no registered product" });

    // Si el carrito no existe, crearlo
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.products.find((p) => p.product.toString() === productId);

    if (existingProduct) {
      // Si ya está en el carrito, aumentar la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si no está en el carrito, agregarlo
      cart.products.push({ product: productId, quantity });
    }

    // Recalcular el total del carrito
    const productDetails = await Promise.all(
      cart.products.map(async (p) => {
        const prod = await Product.findById(p.product);
        return prod ? prod.price * p.quantity : 0; // Multiplicar precio por cantidad
      })
    );

    // Sumar los precios para obtener el monto total
    cart.payAmount = productDetails.reduce((sum, price) => sum + price, 0);

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto del carrito
export const removeProductFromCart = async (req, res) => {

  try {
    // const { productId } = req.params;
    const { productId } = req.body;
    const userId = req.userId;  // Obtenido desde el token

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "no registered cart" });

    // Filtramos los productos para eliminar el seleccionado
    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    // Obtenemos los productos restantes para calcular el total correctamente
    
    // Se usa .reduce() para sumar todos los precios.
    const productDetails = await Promise.all(cart.products.map(async (p) => {
      // Se usa Promise.all() para esperar la carga de los precios de los productos antes de calcular el total.
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
    const userId = req.userId; // Obtenido desde el token

    // Buscar el carrito del usuario
    let cart = await Cart.findOne({ user: userId });

    // Si no existe carrito, retornar error 404
    if (!cart) return res.status(404).json({ message: "no registered cart" });

    // Vaciar el carrito y reiniciar el monto total
    cart.products = [];
    cart.payAmount = 0;

    // Guardar los cambios
    await cart.save();

    res.json({ message: "Clear cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};