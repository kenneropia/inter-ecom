import Login from "../pages/Login";

import { Route, Routes } from "react-router-dom";
import Navbar from "../components/NavBar";
import RequireAuth from "../components/RequireAuth";
import { ProductsLst } from "../pages/ProductIst";
import Cart from "../pages/Cart";

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ProductsLst />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
