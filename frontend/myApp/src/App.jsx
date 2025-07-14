import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Show the navbar on all pages */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:productId" element={<EditProductWrapper />} />
        <Route path="/details/:productId" element={<ProductDetailsWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper to extract productId param
const EditProductWrapper = () => {
  const { productId } = useParams();
  return <EditProduct productId={productId} onBack={() => window.history.back()} />;
};

const ProductDetailsWrapper = () => {
  const { productId } = useParams();
  return <ProductDetails productId={productId} onBack={() => window.history.back()} />;
};

export default App;
