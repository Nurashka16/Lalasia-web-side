import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  ABOUT_US,
  BASKET,
  CATEGORIES,
  EMPTY_PAGE,
  HOME,
  ORDER,
  PRODUCT,
  SIGN_UP,
} from "./utils/const";
import { observer } from "mobx-react-lite";
import PopUpProvider from "./common/components/PopUpProvider/PopUpProvider";
import Header from "./header/components/Header";
import Home from "./home/components/Home";
import AboutUs from "./aboutUs/components/AboutUs";
import SignIn from "./auth/components/SignIn";
import Basket from "./basket/components/BasketPage/Basket";
import EmptyPage from "./empty/components/EmptyPage/EmptyPage";
import SignUp from "./auth/components/SignUp";
import Product from "./product/components/Product";
import GoCheckout from "./basket/components/GoCheckoutPage/GoCheckout";
import Payment from "./payment/components/Payment";
import basketStore from "./basket/stores/basket-store";
import Categories from "./categories/components";

const App = observer(() => {
  const isAuth = true;
  //  { isAuth } = authStore;
  const { dataProductsBasket } = basketStore;

  return (
    <PopUpProvider>
      {/*Проверить почему не работает popup*/}
      <div className="pages">
        <Header
          isAuth={isAuth}
          countSelectedProducts={dataProductsBasket.size}
        />
        <Outlet />
        {isAuth ? (
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={PRODUCT} element={<Product />}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path={CATEGORIES} element={<Categories />} />
            <Route path={ABOUT_US} element={<AboutUs />} />
            <Route path={BASKET} element={<Basket />} />
            {/* <Route path={ORDER} element={<GoCheckout />} /> */}
            {/* <Route path={AUTH} element={<SignIn />}></Route> */}
            {/*Прописать роут для стр профиля*/}
            <Route path={EMPTY_PAGE} element={<EmptyPage />} />

            <Route path="/goCheckout" element={<GoCheckout />} />
            {/*Проверить используются ли эти стр*/}
            <Route path="/payment" element={<Payment />} />
            {/*Проверить используются ли эти стр*/}
          </Routes>
        ) : (
          <Routes>
            <Route path={HOME} element={<SignIn />} />
            <Route path={SIGN_UP} element={<SignUp />} />
          </Routes>
        )}
      </div>
    </PopUpProvider>
  );
});

export default App;
