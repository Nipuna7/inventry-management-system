import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Eye, Edit, Trash2, Calendar, DollarSign, Hash, Tag } from 'lucide-react';

const ProductList = () => {
  // States for product list, loading status, error, search, selected product
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();


  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/products/all');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setError('');
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product by ID
  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/products/delete/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setProducts(products.filter(product => product.product_id !== productId));
        } else {
          setError('Failed to delete product');
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      }
    }
  };

  // Filter product list based on search term
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format dates and prices
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Fetch product list on first render
  useEffect(() => {
    fetchProducts();
  }, []);

  // ----------- STYLES --------------
  const containerStyle = { minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)', padding: '20px' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' };
  const titleContainerStyle = { display: 'flex', alignItems: 'center', gap: '12px' };
  const iconContainerStyle = { background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const titleStyle = { fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 };
  const searchContainerStyle = { position: 'relative', maxWidth: '400px', width: '100%' };
  const searchInputStyle = { width: '100%', padding: '12px 16px 12px 48px', border: '1px solid #d1d5db', borderRadius: '50px', fontSize: '16px', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' };
  const searchIconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' };
  const errorStyle = { backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '8px', marginBottom: '20px' };
  const loadingStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', fontSize: '18px', color: '#6b7280' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' };
  const cardStyle = { backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #f3f4f6' };
  const cardHoverStyle = { transform: 'translateY(-4px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' };
  const productImageStyle = { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', backgroundColor: '#f3f4f6' };
  const productNameStyle = { fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' };
  const productInfoStyle = { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#6b7280' };
  const priceStyle = { fontSize: '24px', fontWeight: 'bold', color: '#059669', marginBottom: '12px' };
  const descriptionStyle = { color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px', maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' };
  const actionsStyle = { display: 'flex', gap: '8px', marginTop: '16px' };
  const buttonBaseStyle = { padding: '8px 12px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px' };
  const viewButtonStyle = { ...buttonBaseStyle, backgroundColor: '#3b82f6', color: 'white' };
  const editButtonStyle = { ...buttonBaseStyle, backgroundColor: '#f59e0b', color: 'white' };
  const deleteButtonStyle = { ...buttonBaseStyle, backgroundColor: '#ef4444', color: 'white' };
  const modalStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' };
  const modalContentStyle = { backgroundColor: 'white', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' };
  const modalHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' };
  const closeButtonStyle = { backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '4px' };

  return (
    <div style={containerStyle}>
      {/* Header section */}
      <div style={headerStyle}>
        <div style={titleContainerStyle}>
          <div style={iconContainerStyle}>
            <Package size={24} color="white" />
          </div>
          <h1 style={titleStyle}>Product Inventory</h1>
        </div>

        {/* Search bar */}
        <div style={searchContainerStyle}>
          <div style={searchIconStyle}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* Error message */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Product Cards */}
      {loading ? (
        <div style={loadingStyle}>Loading products...</div>
      ) : (
        <div style={gridStyle}>
          {filteredProducts.length === 0 ? (
            <div style={{ ...loadingStyle, gridColumn: '1 / -1' }}>
              No products found
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.product_id}
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
              >
                {/* Product Image (served from backend) */}
                {product.imageUrl && (
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.productName}
                    style={productImageStyle}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}

                {/* Product Info */}
                <div style={productNameStyle}>{product.productName}</div>
                <div style={productInfoStyle}><Tag size={16} />{product.category}</div>
                <div style={productInfoStyle}><Hash size={16} />Quantity: {product.quantity}</div>
                <div style={priceStyle}>{formatPrice(product.price)}</div>
                {product.description && <div style={descriptionStyle}>{product.description}</div>}
                <div style={productInfoStyle}><Calendar size={16} />Mfg: {formatDate(product.man_date)}</div>
                <div style={productInfoStyle}><Calendar size={16} />Exp: {formatDate(product.exp_date)}</div>

                {/* Action Buttons */}
                <div style={actionsStyle}>
                  <button style={viewButtonStyle} onClick={() => setSelectedProduct(product)}>
                    <Eye size={16} /> View
                  </button>
                  <button style={editButtonStyle} onClick={() => navigate(`/edit/${product.product_id}`)}>
                    <Edit size={16} /> Edit
                  </button>
                  <button style={deleteButtonStyle} onClick={() => deleteProduct(product.product_id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div style={modalStyle} onClick={() => setSelectedProduct(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Product Details</h2>
              <button style={closeButtonStyle} onClick={() => setSelectedProduct(null)}>×</button>
            </div>

            {/* Product Image in Modal */}
            {selectedProduct.imageUrl && (
              <img
                src={`http://localhost:8080${selectedProduct.imageUrl}`}
                alt={selectedProduct.productName}
                style={{ ...productImageStyle, marginBottom: '20px' }}
              />
            )}

            {/* Modal Product Info */}
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '20px' }}>{selectedProduct.productName}</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><strong>Price:</strong> {formatPrice(selectedProduct.price)}</div>
              <div><strong>Category:</strong> {selectedProduct.category}</div>
              <div><strong>Quantity:</strong> {selectedProduct.quantity}</div>
              <div><strong>Product ID:</strong> {selectedProduct.product_id}</div>
              <div><strong>Manufacturing Date:</strong> {formatDate(selectedProduct.man_date)}</div>
              <div><strong>Expiry Date:</strong> {formatDate(selectedProduct.exp_date)}</div>
            </div>

            {selectedProduct.description && (
              <div style={{ marginTop: '16px' }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '8px', color: '#6b7280', lineHeight: '1.6' }}>
                  {selectedProduct.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
