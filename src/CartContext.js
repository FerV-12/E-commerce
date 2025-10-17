// ...existing code...
import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...item, quantity: 1 }] };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
          .filter((i) => i.quantity > 0),
      };
    }
    case "REMOVE": {
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    { items: [] },
    (init) => {
      try {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : init;
      } catch (e) {
        return init;
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = state.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const count = state.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems: state.items, addToCart, updateQuantity, removeFromCart, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;