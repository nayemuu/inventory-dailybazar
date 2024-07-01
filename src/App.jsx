import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Test from './pages/Test/Test';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import AddProduct from './pages/products-group/AddProduct/AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product-list" element={<AddProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/category" element={<AddProduct />} />
        <Route path="/sub-category" element={<AddProduct />} />
        <Route path="/location" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
