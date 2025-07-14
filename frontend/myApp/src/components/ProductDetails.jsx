import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Package, 
  DollarSign, 
  Tag, 
  Hash, 
  Calendar, 
  FileText, 
  Image, 
  Edit, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock,
  Info
} from 'lucide-react';

const ProductDetails = ({ productId, onBack, onEdit, onDelete }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  // Fetch product details by ID
  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/products/get/${id}`);
      
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
        setError('');
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to fetch product details');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:8080/products/delete/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          if (onDelete) {
            onDelete(productId);
          }
          if (onBack) {
            onBack();
          }
        } else {
          setError('Failed to delete product');
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get stock status
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Out of Stock', color: '#ef4444', icon: AlertCircle };
    if (quantity < 10) return { status: 'Low Stock', color: '#f59e0b', icon: AlertCircle };
    return { status: 'In Stock', color: '#10b981', icon: CheckCircle };
  };

  // Get expiry status
  const getExpiryStatus = (expDate) => {
    if (!expDate) return { status: 'No expiry date', color: '#6b7280', icon: Info };
    
    const today = new Date();
    const expiryDate = new Date(expDate);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'Expired', color: '#ef4444', icon: AlertCircle };
    if (daysUntilExpiry <= 7) return { status: 'Expires Soon', color: '#f59e0b', icon: Clock };
    if (daysUntilExpiry <= 30) return { status: 'Expires This Month', color: '#f59e0b', icon: Clock };
    return { status: 'Good', color: '#10b981', icon: CheckCircle };
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
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f8fafc'
  };

  const headerLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
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
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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

  const actionButtonsStyle = {
    display: 'flex',
    gap: '12px'
  };

  const buttonBaseStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const editButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f59e0b',
    color: 'white'
  };

  const deleteButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const contentStyle = {
    padding: '32px'
  };

  const errorStyle = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '16px',
    borderRadius: '8px',
    margin: '20px'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    fontSize: '18px',
    color: '#6b7280'
  };

  const mainContentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    marginBottom: '32px'
  };

  const imageContainerStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const productImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const noImageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: '#6b7280'
  };

  const productInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const productNameStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const priceStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: '16px'
  };

  const statusContainerStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px'
  };

  const statusBadgeStyle = (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: color + '20',
    color: color,
    border: `1px solid ${color}30`
  });

  const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  };

  const infoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    fontSize: '14px'
  };

  const infoLabelStyle = {
    fontWeight: '500',
    color: '#374151'
  };

  const infoValueStyle = {
    color: '#6b7280'
  };

  const descriptionSectionStyle = {
    marginTop: '32px',
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const descriptionStyle = {
    color: '#6b7280',
    lineHeight: '1.6',
    fontSize: '14px'
  };

  const responsiveStyle = {
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  };

  if (loading) {
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

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={errorStyle}>
            {error}
          </div>
          {onBack && (
            <div style={{ padding: '20px' }}>
              <button onClick={onBack} style={backButtonStyle}>
                <ArrowLeft size={16} />
                Back to Products
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={errorStyle}>
            Product not found.
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.quantity);
  const expiryStatus = getExpiryStatus(product.exp_date);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
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
              <Package size={24} color="white" />
            </div>
            <h1 style={titleStyle}>Product Details</h1>
          </div>
          
          <div style={actionButtonsStyle}>
            {onEdit && (
              <button
                onClick={() => onEdit(product.product_id)}
                style={editButtonStyle}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-1px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                <Edit size={16} />
                Edit
              </button>
            )}
            
            <button
              onClick={handleDelete}
              style={deleteButtonStyle}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-1px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={mainContentStyle}>
            {/* Product Image */}
            <div style={imageContainerStyle}>
              {product.imageUrl && !imageError ? (
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  style={productImageStyle}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div style={noImageStyle}>
                  <Image size={48} />
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div style={productInfoStyle}>
              <div>
                <h2 style={productNameStyle}>{product.productName}</h2>
                <div style={priceStyle}>{formatPrice(product.price)}</div>
                
                <div style={statusContainerStyle}>
                  <div style={statusBadgeStyle(stockStatus.color)}>
                    <stockStatus.icon size={14} />
                    {stockStatus.status}
                  </div>
                  <div style={statusBadgeStyle(expiryStatus.color)}>
                    <expiryStatus.icon size={14} />
                    {expiryStatus.status}
                  </div>
                </div>
              </div>

              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <Hash size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Product ID:</span>
                  <span style={infoValueStyle}>{product.product_id}</span>
                </div>

                <div style={infoItemStyle}>
                  <Tag size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Category:</span>
                  <span style={infoValueStyle}>{product.category}</span>
                </div>

                <div style={infoItemStyle}>
                  <Hash size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Quantity:</span>
                  <span style={infoValueStyle}>{product.quantity} units</span>
                </div>

                <div style={infoItemStyle}>
                  <DollarSign size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Unit Price:</span>
                  <span style={infoValueStyle}>{formatPrice(product.price)}</span>
                </div>

                <div style={infoItemStyle}>
                  <Calendar size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Manufactured:</span>
                  <span style={infoValueStyle}>{formatDate(product.man_date)}</span>
                </div>

                <div style={infoItemStyle}>
                  <Calendar size={16} color="#6b7280" />
                  <span style={infoLabelStyle}>Expires:</span>
                  <span style={infoValueStyle}>{formatDate(product.exp_date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {product.description && (
            <div style={descriptionSectionStyle}>
              <h3 style={sectionTitleStyle}>
                <FileText size={18} />
                Description
              </h3>
              <p style={descriptionStyle}>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;