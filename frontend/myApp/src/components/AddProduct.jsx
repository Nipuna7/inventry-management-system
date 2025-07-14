import React, { useState } from 'react';
import { Plus, Package, DollarSign, FileText, Tag, Hash, Image, Calendar } from 'lucide-react';
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const iconContainerStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
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
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
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
    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'all 0.2s',
    fontSize: '16px'
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
                   onChange={(e) => setImageFile(e.target.files[0])}
                   style={inputStyle}
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
            onFocus={(e) => Object.assign(e.target.style, {...textareaStyle, borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'})}
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
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
          
          <button
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
            onMouseOver={(e) => (e.target.style.backgroundColor = '#f9fafb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;