import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item will look like { name, image, cost, quantity }
  },
  reducers: {
    // ADD ITEM TO CART (or increase quantity if it already exists)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // product sent from handleAddToCart

      // Check if it's already in the cart
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If already there, just +1 quantity
        existingItem.quantity++;
      } else {
        // If not there, push it with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // REMOVE ITEM COMPLETELY FROM CART
    removeItem: (state, action) => {
      // action.payload should be the product name to remove
      state.items = state.items.filter(
        item => item.name !== action.payload
      );
    },

    // UPDATE THE QUANTITY OF AN ITEM
    updateQuantity: (state, action) => {
      // action.payload should be { name, quantity }
      const { name, quantity } = action.payload;

      // Find item in cart
      const itemToUpdate = state.items.find(
        item => item.name === name
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// export actions so components can dispatch them
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// export reducer so you can add it to store.js
export default CartSlice.reducer;
