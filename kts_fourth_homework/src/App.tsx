import { Outlet, Route, RouteProps, Routes } from "react-router-dom";
import "./App.module.css";
import {
  ABOUT_US,
  AUTH,
  BASKET,
  CATEGORIES,
  EMPTY_PAGE,
  HOME,
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
import Basket from "./basket/components/Basket";
import EmptyPage from "./empty/components/EmptyPage/EmptyPage";
import Categories from "./categories/components/categoriesCatalog/Categories";
import SignUp from "./auth/components/SignUp";
import ProductsCategory from "./categories/components/productsCategory";
import InfoCard from "./product/components/InfoCard";
import Product from "./product/components/Product";

const App = observer(() => {
  const { isAuth } = authStore;
  return (
    <PopUpProvider>
      <div className="page">
        <Header isAuth={isAuth} />
        <Outlet />
        {isAuth ? (
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={PRODUCT} element={<Product/>}>
              <Route path=":id" element={<InfoCard />} />
            </Route>
            <Route path={ABOUT_US} element={<AboutUs />}></Route>
            <Route path={AUTH} element={<SignIn />}></Route>
            <Route path={BASKET} element={<Basket />}></Route>
            <Route path={EMPTY_PAGE} element={<EmptyPage />}></Route>
            <Route path={CATEGORIES} element={<Categories />}></Route>
            <Route path={PRODUCTS_CATEGORY} element={<ProductsCategory />}>
              <Route path=":id" element={<ProductsCategory />} />
            </Route>
            {/* <Route path={PRODUCTS_CATEGORY} element={<ProductsCategory />}></Route> */}
          </Routes>
        ) : (
          <Routes>
            <Route path={HOME} element={<SignIn />}></Route>
            <Route path={SIGN_UP} element={<SignUp/>}></Route>
          </Routes>
        )}
      </div>
    </PopUpProvider>
  );
});

export default App;
