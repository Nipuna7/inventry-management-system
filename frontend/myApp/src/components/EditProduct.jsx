import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    background: 'linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)',
    padding: '20px'
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '32px'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
  };

  const backButtonStyle = {
    background: 'none',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    transition: 'all 0.2s'
  };

  const iconContainerStyle = {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  };

  const messageStyle = (type) => ({
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    backgroundColor: type === 'success' ? '#f0fdf4' : '#fef2f2',
    border: `1px solid ${type === 'success' ? '#bbf7d0' : '#fecaca'}`,
    color: type === 'success' ? '#166534' : '#dc2626'
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
    color: '#374151',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#f59e0b',
    boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.1)'
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
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'all 0.2s',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const secondaryButtonStyle = {
    padding: '12px 24px',
    border: '1px solid #d1d5db',
    color: '#374151',
    borderRadius: '8px',
    fontWeight: '500',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '16px'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    fontSize: '18px',
    color: '#6b7280'
  };

  const productInfoStyle = {
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0'
  };

  if (fetchingProduct) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={loadingStyle}>
            Loading product details...
          </div>
        </div>
      </div>
    );
  }

  if (!originalProduct) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={messageStyle('error')}>
            Product not found or failed to load.
          </div>
          {onBack && (
            <button onClick={onBack} style={secondaryButtonStyle}>
              <ArrowLeft size={16} />
              Back to Products
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          {onBack && (
            <button
              onClick={onBack}
              style={backButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div style={iconContainerStyle}>
            <Edit size={24} color="white" />
          </div>
          <h1 style={titleStyle}>Edit Product</h1>
        </div>

        <div style={productInfoStyle}>
          <strong>Product ID:</strong> {originalProduct.product_id}
        </div>

        {message.text && (
          <div style={messageStyle(message.type)}>
            {message.text}
          </div>
        )}

        <div style={gridStyle}>
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
        </div>

        <div style={fieldStyle}>
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
        </div>

        <div style={fieldStyle}>
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
            onFocus={(e) => Object.assign(e.target.style, {...textareaStyle, borderColor: '#f59e0b', boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.1)'})}
            onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
          />
        </div>

        <div style={buttonContainerStyle}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={primaryButtonStyle}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            <Save size={16} />
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            style={secondaryButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#f9fafb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;