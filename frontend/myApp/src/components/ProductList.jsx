import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Eye, Edit, Trash2, Calendar, DollarSign, Hash, Tag } from 'lucide-react';

const ProductList = () => {
  // Color palette - using only specified colors
  const colors = {
    primary: '#52357B',
    secondary: '#5459AC', 
    tertiary: '#648DB3',
    accent: '#B2D8CE',
    white: '#FFFFFF',
    gray: '#F8F9FA',
    darkGray: '#6B7280',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B'
  };

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // ----------- ENHANCED STYLES --------------
  const containerStyle = { 
    minHeight: '100vh', 
    background: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.tertiary}30 100%)`, 
    padding: '32px',
    fontFamily: 'Biome, sans-serif'
  };

  const headerStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '40px', 
    flexWrap: 'wrap', 
    gap: '24px',
    minHeight: '80px' // Added minimum height for consistent alignment
  };

  const titleContainerStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px',
    flex: '1', // Allow title to take available space
    minWidth: '300px' // Minimum width to prevent squashing
  };

  const iconContainerStyle = { 
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, 
    padding: '16px', 
    borderRadius: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    boxShadow: `0 12px 40px ${colors.primary}40, 0 4px 16px ${colors.primary}20`,
    transition: 'all 0.3s ease',
    flexShrink: 0 // Prevent icon container from shrinking
  };

  const titleStyle = { 
    fontSize: '32px', 
    fontWeight: 'bold', 
    color: colors.primary, 
    margin: 0,
    fontFamily: 'Biome, sans-serif',
    letterSpacing: '1px'
  };

  const searchContainerStyle = { 
    position: 'relative', 
    maxWidth: '400px', 
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '56px' // Fixed height to match the input
  };

  const searchInputStyle = { 
    width: '100%', 
    height: '56px', // Fixed height
    padding: '0 20px 0 56px', // Adjusted padding for fixed height
    border: `2px solid ${colors.accent}`, 
    borderRadius: '30px', 
    fontSize: '16px', 
    outline: 'none', 
    boxShadow: `0 8px 32px ${colors.tertiary}20, 0 4px 16px ${colors.accent}30`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    fontFamily: 'Biome, sans-serif',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center' // Center text vertically
  };

  const searchIconStyle = { 
    position: 'absolute', 
    left: '20px', 
    top: '50%', 
    transform: 'translateY(-50%)', 
    color: colors.tertiary,
    zIndex: 1 // Ensure icon is above input
  };

  const errorStyle = { 
    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
    border: `1px solid ${colors.error}40`, 
    color: colors.error, 
    padding: '16px', 
    borderRadius: '16px', 
    marginBottom: '32px',
    fontFamily: 'Biome, sans-serif'
  };

  const loadingStyle = { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px', 
    fontSize: '18px', 
    color: colors.primary,
    fontFamily: 'Biome, sans-serif'
  };

  const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
    gap: '32px' 
  };

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: '24px', 
    padding: '28px', 
    boxShadow: `0 20px 60px ${colors.primary}15, 0 8px 32px ${colors.tertiary}20, 0 4px 16px ${colors.accent}30`, 
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
    border: `1px solid ${colors.accent}40`,
    backdropFilter: 'blur(20px)',
    position: 'relative',
    overflow: 'hidden'
  };

  const productImageStyle = { 
    width: '100%', 
    height: '220px', 
    objectFit: 'cover', 
    borderRadius: '16px', 
    marginBottom: '20px', 
    backgroundColor: colors.gray,
    boxShadow: `0 12px 40px ${colors.tertiary}20, 0 4px 16px ${colors.accent}30`,
    transition: 'all 0.3s ease'
  };

  const productNameStyle = { 
    fontSize: '22px', 
    fontWeight: 'bold', 
    color: colors.primary, 
    marginBottom: '12px',
    fontFamily: 'Biome, sans-serif'
  };

  const productInfoStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    marginBottom: '10px', 
    fontSize: '14px', 
    color: colors.darkGray,
    fontFamily: 'Biome, sans-serif'
  };

  const priceStyle = { 
    fontSize: '28px', 
    fontWeight: 'bold', 
    color: colors.success, 
    marginBottom: '16px',
    fontFamily: 'Biome, sans-serif'
  };

  const descriptionStyle = { 
    color: colors.darkGray, 
    fontSize: '14px', 
    lineHeight: '1.6', 
    marginBottom: '20px', 
    maxHeight: '72px', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
    fontFamily: 'Biome, sans-serif'
  };

  const actionsStyle = { 
    display: 'flex', 
    gap: '12px', 
    marginTop: '20px' 
  };

  const buttonBaseStyle = { 
    padding: '12px 16px', 
    borderRadius: '16px', 
    border: 'none', 
    fontSize: '14px', 
    fontWeight: '600', 
    cursor: 'pointer', 
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '6px',
    fontFamily: 'Biome, sans-serif',
    backdropFilter: 'blur(10px)',
    transform: 'translateY(0)'
  };

  const viewButtonStyle = { 
    ...buttonBaseStyle, 
    backgroundColor: colors.tertiary, 
    color: 'white',
    boxShadow: `0 8px 32px ${colors.tertiary}40, 0 4px 16px ${colors.tertiary}20`
  };

  const editButtonStyle = { 
    ...buttonBaseStyle, 
    backgroundColor: colors.secondary, 
    color: 'white',
    boxShadow: `0 8px 32px ${colors.secondary}40, 0 4px 16px ${colors.secondary}20`
  };

  const deleteButtonStyle = { 
    ...buttonBaseStyle, 
    backgroundColor: colors.error, 
    color: 'white',
    boxShadow: `0 8px 32px ${colors.error}40, 0 4px 16px ${colors.error}20`
  };

  const modalStyle = { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: `${colors.primary}CC`, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000, 
    padding: '20px',
    backdropFilter: 'blur(20px)'
  };

  const modalContentStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: '24px', 
    padding: '40px', 
    maxWidth: '700px', 
    width: '100%', 
    maxHeight: '90vh', 
    overflowY: 'auto',
    boxShadow: `0 40px 120px ${colors.primary}40, 0 20px 60px ${colors.secondary}30`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${colors.accent}40`
  };

  const modalHeaderStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '32px',
    paddingBottom: '16px',
    borderBottom: `2px solid ${colors.accent}40`
  };

  const closeButtonStyle = { 
    backgroundColor: 'transparent', 
    border: 'none', 
    fontSize: '24px', 
    cursor: 'pointer', 
    padding: '8px',
    borderRadius: '50%',
    color: colors.primary,
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Header section */}
      <motion.div 
        style={headerStyle}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={titleContainerStyle}>
          <motion.div 
            style={iconContainerStyle}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 16px 48px ${colors.primary}50, 0 8px 24px ${colors.primary}30`
            }}
            transition={{ duration: 0.3 }}
          >
            <Package size={28} color="white" />
          </motion.div>
          <h1 style={titleStyle}>Product Inventory</h1>
        </div>

        {/* Search bar */}
        <div style={searchContainerStyle}>
          <div style={searchIconStyle}>
            <Search size={20} />
          </div>
          <motion.input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
            whileFocus={{
              borderColor: colors.primary,
              boxShadow: `0 12px 40px ${colors.primary}30, 0 4px 16px ${colors.primary}20`,
              scale: 1.02
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Error message */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Product Cards */}
      {loading ? (
        <div style={loadingStyle}>Loading products...</div>
      ) : (
        <motion.div 
          style={gridStyle}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.length === 0 ? (
            <div style={{ ...loadingStyle, gridColumn: '1 / -1' }}>
              No products found
            </div>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.product_id}
                style={cardStyle}
                variants={cardVariants}
                whileHover="hover"
                layout
                layoutId={`product-${product.product_id}`}
              >
                {/* Product Image (served from backend) */}
                {product.imageUrl && (
                  <motion.img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.productName}
                    style={productImageStyle}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
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
                  <motion.button 
                    style={viewButtonStyle} 
                    onClick={() => setSelectedProduct(product)}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Eye size={16} /> View
                  </motion.button>
                  <motion.button 
                    style={editButtonStyle} 
                    onClick={() => navigate(`/edit/${product.product_id}`)}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Edit size={16} /> Edit
                  </motion.button>
                  <motion.button 
                    style={deleteButtonStyle} 
                    onClick={() => deleteProduct(product.product_id)}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Trash2 size={16} /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            style={modalStyle} 
            onClick={() => setSelectedProduct(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              style={modalContentStyle} 
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div style={modalHeaderStyle}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  color: colors.primary,
                  fontFamily: 'Biome, sans-serif'
                }}>
                  Product Details
                </h2>
                <motion.button 
                  style={closeButtonStyle} 
                  onClick={() => setSelectedProduct(null)}
                  whileHover={{ 
                    backgroundColor: `${colors.accent}40`,
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>

              {/* Product Image in Modal */}
              {selectedProduct.imageUrl && (
                <motion.img
                  src={`http://localhost:8080${selectedProduct.imageUrl}`}
                  alt={selectedProduct.productName}
                  style={{ ...productImageStyle, marginBottom: '20px' }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Modal Product Info */}
              <motion.div 
                style={{ marginBottom: '16px' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <strong style={{ 
                  fontSize: '24px', 
                  color: colors.primary,
                  fontFamily: 'Biome, sans-serif'
                }}>
                  {selectedProduct.productName}
                </strong>
              </motion.div>

              <motion.div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px', 
                  marginBottom: '16px',
                  fontFamily: 'Biome, sans-serif'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div><strong>Price:</strong> {formatPrice(selectedProduct.price)}</div>
                <div><strong>Category:</strong> {selectedProduct.category}</div>
                <div><strong>Quantity:</strong> {selectedProduct.quantity}</div>
                <div><strong>Product ID:</strong> {selectedProduct.product_id}</div>
                <div><strong>Manufacturing Date:</strong> {formatDate(selectedProduct.man_date)}</div>
                <div><strong>Expiry Date:</strong> {formatDate(selectedProduct.exp_date)}</div>
              </motion.div>

              {selectedProduct.description && (
                <motion.div 
                  style={{ marginTop: '16px' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <strong style={{ fontFamily: 'Biome, sans-serif' }}>Description:</strong>
                  <p style={{ 
                    marginTop: '8px', 
                    color: colors.darkGray, 
                    lineHeight: '1.6',
                    fontFamily: 'Biome, sans-serif'
                  }}>
                    {selectedProduct.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;