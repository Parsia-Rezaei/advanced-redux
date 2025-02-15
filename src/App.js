import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendData } from "./components/store/cart-actions";

let isInitial = true;

function App() {
  const show = useSelector((state) => state.ui.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData())
  } ,[dispatch])
  
  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
     }
     if(cart.changed) {
       dispatch(sendData(cart))
     }
     dispatch(sendData(cart))
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
