"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Initial State
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Reducer Function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (existingIndex >= 0) {
        // Item exists, increase quantity
        updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals({ ...state, items: updatedItems });
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return calculateTotals({ ...state, items: updatedItems });
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return calculateTotals({ ...state, items: updatedItems });
    }

    case "LOAD_CART": {
      return action.payload;
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

// Helper function to calculate totals
function calculateTotals(state) {
  const totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    ...state,
    totalQuantity,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };
}

// Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state));
  }, [state]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalPrice: state.totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
