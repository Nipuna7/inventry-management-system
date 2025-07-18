import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit, Package, DollarSign, FileText, Tag, Hash, Image, Calendar, Save, ArrowLeft } from 'lucide-react';

const EditProduct = ({ productId, onBack, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    quantity: '',
    imageUrl: '',
    man_date: '',
    exp_date: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [originalProduct, setOriginalProduct] = useState(null);

  // Fetch product details by ID
  const fetchProductById = async (id) => {
    try {
      setFetchingProduct(true);
      const response = await axios.get(`http://localhost:8080/products/get/${id}`);
      
      const product = response.data;
      setOriginalProduct(product);
      
      // Format dates for input fields
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
      };

      setFormData({
        productName: product.productName || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        quantity: product.quantity || '',
        imageUrl: product.imageUrl || '',
        man_date: formatDateForInput(product.man_date),
        exp_date: formatDateForInput(product.exp_date)
      });
    } catch (error) {
      const errorMessage = error.response?.data || error.message || 'Failed to fetch product details';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setFetchingProduct(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Convert string values to appropriate types
      const productData = {
        ...formData,
        price: parseInt(formData.price) || 0,
        quantity: parseInt(formData.quantity) || 0,
        man_date: formData.man_date ? new Date(formData.man_date).toISOString() : null,
        exp_date: formData.exp_date ? new Date(formData.exp_date).toISOString() : null
      };

      const response = await axios.put(`http://localhost:8080/products/update/${productId}`, productData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = response.data;
      setMessage({ type: 'success', text: 'Product updated successfully!' });
      
      // Call callback if provided
      if (onProductUpdated) {
        onProductUpdated(result);
      }
      
      // Update original product data
      setOriginalProduct(result);
    } catch (error) {
      const errorMessage = error.response?.data || error.message || 'Failed to update product';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (originalProduct) {
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
      };

      setFormData({
        productName: originalProduct.productName || '',
        price: originalProduct.price || '',
        description: originalProduct.description || '',
        category: originalProduct.category || '',
        quantity: originalProduct.quantity || '',
        imageUrl: originalProduct.imageUrl || '',
        man_date: formatDateForInput(originalProduct.man_date),
        exp_date: formatDateForInput(originalProduct.exp_date)
      });
    }
    setMessage({ type: '', text: '' });
  };

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #B2D8CE 0%, #648DB3 100%)',
    padding: '20px'
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(82, 53, 123, 0.25), 0 10px 20px -5px rgba(82, 53, 123, 0.1)',
    padding: '32px',
    transition: 'all 0.3s ease-in-out'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
  };

  const backButtonStyle = {
    background: 'none',
    border: '1px solid #648DB3',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#52357B',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 6px -1px rgba(82, 53, 123, 0.1)'
  };

  const iconContainerStyle = {
    background: 'linear-gradient(135deg, #52357B 0%, #5459AC 100%)',
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(82, 53, 123, 0.3)'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#52357B',
    margin: 0
  };

  const messageStyle = (type) => ({
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    backgroundColor: type === 'success' ? '#B2D8CE' : '#f8d7da',
    border: `1px solid ${type === 'success' ? '#648DB3' : '#f5c6cb'}`,
    color: type === 'success' ? '#52357B' : '#721c24',
    boxShadow: '0 4px 6px -1px rgba(82, 53, 123, 0.1)',
    transition: 'all 0.3s ease-in-out'
  });

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  };

  const fieldStyle = {
    marginBottom: '24px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#52357B',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #648DB3',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(82, 53, 123, 0.1)'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#5459AC',
    boxShadow: '0 0 0 3px rgba(84, 89, 172, 0.1), 0 4px 6px rgba(82, 53, 123, 0.1)'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    paddingTop: '24px'
  };

  const primaryButtonStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #52357B 0%, #5459AC 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'all 0.3s ease-in-out',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 10px 15px -3px rgba(82, 53, 123, 0.3), 0 4px 6px -2px rgba(82, 53, 123, 0.1)'
  };

  const secondaryButtonStyle = {
    padding: '12px 24px',
    border: '1px solid #648DB3',
    color: '#52357B',
    borderRadius: '8px',
    fontWeight: '500',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    fontSize: '16px',
    boxShadow: '0 4px 6px -1px rgba(82, 53, 123, 0.1)'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    fontSize: '18px',
    color: '#5459AC'
  };

  const productInfoStyle = {
    backgroundColor: '#B2D8CE',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #648DB3',
    color: '#52357B',
    boxShadow: '0 4px 6px -1px rgba(82, 53, 123, 0.1)',
    transition: 'all 0.3s ease-in-out'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (fetchingProduct) {
    return (
      <div style={containerStyle}>
        <motion.div 
          style={cardStyle}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div style={loadingStyle}>
            Loading product details...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!originalProduct) {
    return (
      <div style={containerStyle}>
        <motion.div 
          style={cardStyle}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div style={messageStyle('error')}>
            Product not found or failed to load.
          </div>
          {onBack && (
            <motion.button 
              onClick={onBack} 
              style={secondaryButtonStyle}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <ArrowLeft size={16} />
              Back to Products
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <motion.div 
        style={cardStyle}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div style={headerStyle} variants={itemVariants}>
          {onBack && (
            <motion.button
              onClick={onBack}
              style={backButtonStyle}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseOver={(e) => (e.target.style.backgroundColor = '#B2D8CE')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <ArrowLeft size={20} />
            </motion.button>
          )}
          <div style={iconContainerStyle}>
            <Edit size={24} color="white" />
          </div>
          <h1 style={titleStyle}>Edit Product</h1>
        </motion.div>

        <motion.div style={productInfoStyle} variants={itemVariants}>
          <strong>Product ID:</strong> {originalProduct.product_id}
        </motion.div>

        {message.text && (
          <motion.div 
            style={messageStyle(message.type)}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {message.text}
          </motion.div>
        )}

        <motion.div style={gridStyle} variants={itemVariants}>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Package size={16} />
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter product name"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              <DollarSign size={16} />
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
              placeholder="Enter price"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Tag size={16} />
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter category"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Hash size={16} />
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
              placeholder="Enter quantity"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Calendar size={16} />
              Manufacturing Date
            </label>
            <input
              type="date"
              name="man_date"
              value={formData.man_date}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Calendar size={16} />
              Expiry Date
            </label>
            <input
              type="date"
              name="exp_date"
              value={formData.exp_date}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
        </motion.div>

        <motion.div style={fieldStyle} variants={itemVariants}>
          <label style={labelStyle}>
            <Image size={16} />
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter image URL"
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </motion.div>

        <motion.div style={fieldStyle} variants={itemVariants}>
          <label style={labelStyle}>
            <FileText size={16} />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={textareaStyle}
            placeholder="Enter product description"
            onFocus={(e) => Object.assign(e.target.style, {...textareaStyle, borderColor: '#5459AC', boxShadow: '0 0 0 3px rgba(84, 89, 172, 0.1), 0 4px 6px rgba(82, 53, 123, 0.1)'})}
            onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
          />
        </motion.div>

        <motion.div style={buttonContainerStyle} variants={itemVariants}>
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={primaryButtonStyle}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Save size={16} />
            {loading ? 'Updating Product...' : 'Update Product'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleReset}
            style={secondaryButtonStyle}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onMouseOver={(e) => (e.target.style.backgroundColor = '#B2D8CE')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          >
            Reset
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditProduct;