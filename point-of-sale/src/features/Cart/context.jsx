import { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "./reducer";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const initialState = {
    items: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.items && Array.isArray(parsedCart.items)) {
        parsedCart.items.forEach((item) => {
          dispatch({
            type: "cart/addToCart",
            payload: item,
          });
        });
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product) => {
    dispatch({
      type: "cart/addToCart",
      payload: product,
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: "cart/removeFromCart",
      payload: productId,
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: "cart/updateQuantity",
      payload: { productId, quantity },
    });
  };

  const clearAllItems = () => {
    dispatch({ type: "cart/clearCart" });
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    cartItems: state.items,
    total: state.total,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity: updateItemQuantity,
    clearCart: clearAllItems,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
