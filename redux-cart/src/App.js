import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-actions";

let initial = true;

function App() {

    const dispatch = useDispatch();
    const showCart = useSelector(state => state.showCart.show);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.showCart.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);                 // though dispatch by default never changes

    useEffect(() => {
        if (initial) {
            initial = false;
            return;
        }

        if(cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);           // though dispatch by default never changes

    return (
        <Fragment>
            {notification &&
            <Notification status={notification.status} title={notification.title} message={notification.message}/>}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;