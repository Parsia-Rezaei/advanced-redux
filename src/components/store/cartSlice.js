import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = { totalQuantity: 0, items: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// action creator
export const sendData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending...",
        title: "sending...",
        message: "Sending cart data",
      })
    );

    /// function for sending requests
    const sendRequest = async ()  => {
            const response =  await fetch(
              "https://redux-test-f09e1-default-rtdb.firebaseio.com/cart.json",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cart),
              }
            );
            if (!response.ok) {
              throw new Error("failed to send request to data");
            }
      }

      try {
        await sendRequest();
        dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "sent cart data successfully !",
            })
          );
      } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: "Error",
              title: error.message,
              message: "Sending cart failed",
            })
          );
      }

  };
};

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
