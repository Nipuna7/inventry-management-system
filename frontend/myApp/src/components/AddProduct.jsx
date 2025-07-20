import React, { useState } from 'react';
import { Plus, Package, DollarSign, FileText, Tag, Hash, Image, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddProduct = () => {
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

  const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

         const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    

    try {
      const formPayload = new FormData();
      formPayload.append('image', imageFile);
      formPayload.append('productName', formData.productName);
      formPayload.append('price', formData.price);
      formPayload.append('description', formData.description);
      formPayload.append('category', formData.category);
      formPayload.append('quantity', formData.quantity);
      formPayload.append('man_date', formData.man_date);
      formPayload.append('exp_date', formData.exp_date);

      const response = await axios.post('http://localhost:8080/products/add', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });



      setMessage({ type: 'success', text: 'Product added successfully!' });
      setFormData({
        productName: '',
        price: '',
        description: '',
        category: '',
        quantity: '',
        imageUrl: '',
        man_date: '',
        exp_date: ''
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage({ type: 'error', text: error.response.data });
      } else {
        setMessage({ type: 'error', text: 'Network error: ' + error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #B2D8CE 0%, #648DB3 50%, #5459AC 100%)',
    padding: '20px'
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(82, 53, 123, 0.25), 0 10px 20px -5px rgba(82, 53, 123, 0.1)',
    padding: '32px',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
  };

  const iconContainerStyle = {
    background: 'linear-gradient(135deg, #52357B 0%, #5459AC 100%)',
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 16px rgba(82, 53, 123, 0.3)',
    transition: 'all 0.3s ease'
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
    backgroundColor: type === 'success' ? '#f0fdf4' : '#fef2f2',
    border: `1px solid ${type === 'success' ? '#B2D8CE' : '#fecaca'}`,
    color: type === 'success' ? '#52357B' : '#dc2626',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
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
    border: '2px solid #B2D8CE',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(178, 216, 206, 0.1)'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#5459AC',
    boxShadow: '0 0 0 3px rgba(84, 89, 172, 0.1), 0 4px 8px rgba(84, 89, 172, 0.2)',
    transform: 'translateY(-1px)'
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
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(82, 53, 123, 0.3)',
    transition: 'all 0.3s ease'
  };

  const secondaryButtonStyle = {
    padding: '12px 24px',
    border: '2px solid #648DB3',
    color: '#52357B',
    borderRadius: '8px',
    fontWeight: '500',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 8px rgba(100, 141, 179, 0.2)',
    transition: 'all 0.3s ease'
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      y: -2,
      boxShadow: '0 8px 20px rgba(82, 53, 123, 0.4)'
    },
    tap: { 
      scale: 0.98,
      y: 0
    }
  };

  const secondaryButtonVariants = {
    hover: { 
      scale: 1.02,
      y: -2,
      backgroundColor: '#f8fafc',
      borderColor: '#5459AC',
      boxShadow: '0 6px 16px rgba(100, 141, 179, 0.3)'
    },
    tap: { 
      scale: 0.98,
      y: 0
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <Plus size={24} color="white" />
          </div>
          <h1 style={titleStyle}>Add New Product</h1>
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
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={inputStyle}
          />{imagePreview && (
            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #B2D8CE',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}
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
            onFocus={(e) => Object.assign(e.target.style, {...textareaStyle, borderColor: '#5459AC', boxShadow: '0 0 0 3px rgba(84, 89, 172, 0.1), 0 4px 8px rgba(84, 89, 172, 0.2)', transform: 'translateY(-1px)'})}
            onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
          />
        </div>

        <div style={buttonContainerStyle}>
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={primaryButtonStyle}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.2 }}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => {
              setFormData({
                productName: '',
                price: '',
                description: '',
                category: '',
                quantity: '',
                imageUrl: '',
                man_date: '',
                exp_date: ''
              });
              setMessage({ type: '', text: '' });
            }}
            style={secondaryButtonStyle}
            variants={secondaryButtonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.2 }}
          >
            Clear
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;