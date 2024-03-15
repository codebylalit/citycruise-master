// CartContext.js
import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + item.price * item.quantity
    );
  };

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addToCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
