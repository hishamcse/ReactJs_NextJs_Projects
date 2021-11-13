import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

    const [modalVisibility, setModalVisibility] = useState(false);

    const showCart = () => {
        setModalVisibility(true)
    }

    const hideCart = () => {
        setModalVisibility(false)
    }

    return (
        <CartProvider>
            {modalVisibility && <Cart onClick={hideCart}/>}
            <Header onClick={showCart}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;