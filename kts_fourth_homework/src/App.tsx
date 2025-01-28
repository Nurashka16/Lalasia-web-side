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
  PRODUCTS_CATEGORY,
  SIGN_UP,
} from "./utils/const";
import { observer } from "mobx-react-lite";
import authStore from "./auth/stores/auth-store";
import PopUpProvider from "./common/components/PopUpProvider/PopUpProvider";
import Header from "./header/components/Header";
import Home from "./home/components/Home";
import AboutUs from "./aboutUs/components/AboutUs/AboutUs";
import SignIn from "./auth/components/SignIn";
import Basket from "./basket/components/BasketPage/Basket";
import EmptyPage from "./empty/components/EmptyPage/EmptyPage";
import Categories from "./categories/components/categoriesCatalog/Categories";
import SignUp from "./auth/components/SignUp";
import ProductsCategory from "./categories/components/productsSameCategory";
import InfoCard from "./product/components/InfoCard";
import Product from "./product/components/Product";
// import GoCheckout from "./basket/components/GoCheckoutPage/GoCheckout";
import Payment from "./payment/components/Payment";
import basketStore from "./basket/stores/basket-store";

const App = observer(() => {
  const isAuth = true;
  //  { isAuth } = authStore;
  const { basketProductsIdToCount } = basketStore;

  return (
    <PopUpProvider>
      {/*Проверить почему не работает popup*/}
      <div className="pages">
        <Header
          isAuth={isAuth}
          countSelectedProducts={basketProductsIdToCount.size}
        />
        <Outlet />
        {isAuth ? (
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={PRODUCT} element={<Product />}>
              <Route path=":id" element={<InfoCard />} />
            </Route>
            <Route path={CATEGORIES} element={<Categories />} />
            <Route path={PRODUCTS_CATEGORY} element={<ProductsCategory />}>
              <Route path=":id" element={<ProductsCategory />} />
            </Route>
            <Route path={ABOUT_US} element={<AboutUs />} />
            <Route path={BASKET} element={<Basket />} />
            {/* <Route path={ORDER} element={<GoCheckout />} /> */}
            {/* <Route path={AUTH} element={<SignIn />}></Route> */}
            {/*Прописать роут для стр профиля*/}
            <Route path={EMPTY_PAGE} element={<EmptyPage />} />

            {/* <Route path="/goCheckout" element={<GoCheckout />} /> */}
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
