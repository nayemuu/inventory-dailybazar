import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Test from "./pages/Test/Test";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";
import AddProduct from "./pages/products-group/AddProduct/AddProduct";
import "react-toastify/dist/ReactToastify.css";
import useLocalPropertiesCheck from "./hooks/useLocalPropertiesCheck";
import Loader from "./components/reuseable/Loader/Loader";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import Location from "./pages/products-group/Location/Location";
import DashBoard from "./pages/DashBoard/DashBoard";
import { useSelector } from "react-redux";
import ServerError from "./components/pages/ServerError/ServerError";
import Category from "./pages/products-group/Category/Category";
import AddSupplier from "./pages/supplier-group/AddSupplier/AddSupplier";

const App = () => {
  const localPropertiesChecked = useLocalPropertiesCheck();
  const { underMaintenanceStatus } = useSelector((state) => state.maintenance);

  if (underMaintenanceStatus) {
    return <ServerError />;
  }

  if (!localPropertiesChecked) {
    return (
      <div className="flex justify-center mt-7">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product-list" element={<AddProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/category" element={<Category />} />
        <Route path="/sub-category" element={<AddProduct />} />
        <Route
          path="/location"
          element={
            <PrivateRoute>
              <Location />
            </PrivateRoute>
          }
        />

        <Route path="/supplier-list" element={<AddProduct />} />
        <Route path="/add-supplier" element={<AddSupplier />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
