import { cartActions } from "./cartSlice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
        const response = await fetch("https://redux-test-f09e1-default-rtdb.firebaseio.com/cart.json");
        if(!response.ok) {
            throw new Error("Failed to fetch data")
        }
        const data = await response.json();
        return data
    };

    try {
       const cartData =  await fetchData();
       dispatch(cartActions.replaceCart({
        items:cartData.items || [],
        totalQuantity:cartData.totalQuantity,
       }))
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
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-test-f09e1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,  
          }),
        }
      );
      if (!response.ok) {
        throw new Error("failed to send request to data");
      }
    };

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
