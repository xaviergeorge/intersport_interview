// src/redux/slices/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    productId: string;
    color: string;
    size: string;
    quantity: number;
}
  
interface CartState {
items: CartItem[];
}

const initialState: CartState = {
items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
        const itemIndex = state.items.findIndex(
            (item) => item.productId === action.payload.productId &&
                      item.color === action.payload.color &&
                      item.size === action.payload.size
          );
        
          if (itemIndex !== -1) {
            // If the item already exists in the cart, update the quantity
            state.items[itemIndex].quantity += action.payload.quantity;
          } else {
            // If it's a new item, add it to the cart
            state.items.push(action.payload);
          }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string, color: string, size: string }>) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.productId &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
        );
  
        if (index !== -1) {
          if (state.items[index].quantity > 1) {
            // If there's more than one item, decrease the quantity
            state.items[index].quantity -= 1;
          } else {
            // If it's the last item, remove it from the cart
            state.items.splice(index, 1);
          }
        }
      },
  
      // The setCount action may not be necessary if you handle quantity adjustments within addToCart and removeFromCart
      // If you still need a setCount to handle special cases like setting the quantity from an input field, you can modify it to:
      setItemQuantity: (state, action: PayloadAction<{ productId: string, color: string, size: string, quantity: number }>) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.productId &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
        );
  
        if (index !== -1 && action.payload.quantity >= 0) {
          // Set the quantity of the specific item
          state.items[index].quantity = action.payload.quantity;
        }
      },
  },
});

export const { addToCart, removeFromCart, setItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
