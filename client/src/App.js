import {useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import CategoryProduct from "./scenes/categoryProduct/CategoryProduct";
import {HelmetProvider} from "react-helmet-async";

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <div className="app">
            <HelmetProvider>
                <BrowserRouter>
                    <Navbar/>
                    {/*<ScrollToTop/>*/}
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="item/:itemId" element={<ItemDetails/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="checkout/success" element={<Confirmation/>}/>
                        <Route path="/category/:id" element={<CategoryProduct/>}/>
                    </Routes>
                    <CartMenu/>
                    <Footer/>
                </BrowserRouter>
            </HelmetProvider>
        </div>
    );
}

export default App;
