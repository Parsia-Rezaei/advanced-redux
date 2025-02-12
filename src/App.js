import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const show = useSelector((state) => state.ui.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const sendData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending...",
          title: "sending...",
          message: "Sending cart data",
        })
      );
      try {
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
        
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "sent cart data successfully !",
          })
        );
        
        const data = await response.json();
        console.log("cart data saved", data);
      } catch (error) {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: "Error",
            title: error.message,
            message: "Sending cart failed",
          })
        );
      }
    };

    if(isInitial) {
      isInitial = false;
      return;
     }
    sendData();
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
