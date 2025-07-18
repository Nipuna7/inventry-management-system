import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  // Color palette - using only specified colors
  const colors = {
    primary: '#52357B',
    secondary: '#5459AC', 
    tertiary: '#648DB3',
    accent: '#B2D8CE'
  };

  const navStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.tertiary} 100%)`,
    padding: '20px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: `0 8px 32px ${colors.primary}40, 0 4px 16px ${colors.secondary}30`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(15px)',
    borderBottom: `2px solid ${colors.accent}50`
  };

  const logoStyle = {
    fontFamily: 'Biome, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
    textShadow: `0 2px 8px ${colors.primary}80`
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 8px',
    fontWeight: '600',
    fontSize: '16px',
    padding: '12px 24px',
    borderRadius: '25px',
    backdropFilter: 'blur(10px)',
    fontFamily: 'Biome, sans-serif',
    display: 'inline-block',
    border: `1px solid ${colors.accent}40`,
    background: `linear-gradient(135deg, ${colors.tertiary}20, ${colors.accent}10)`,
    textShadow: `0 1px 4px ${colors.primary}60`
  };

  // Animation variants for buttons
  const buttonVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: `0 4px 12px ${colors.primary}30`
    },
    hover: { 
      scale: 1.05, 
      y: -3,
      boxShadow: `0 8px 24px ${colors.accent}60, 0 4px 12px ${colors.tertiary}40`,
      background: `linear-gradient(135deg, ${colors.accent}30, ${colors.tertiary}20)`,
      borderColor: `${colors.accent}60`
    },
    tap: { 
      scale: 0.98, 
      y: -1,
      boxShadow: `0 2px 8px ${colors.primary}40`
    }
  };

  // Animation variants for logo
  const logoVariants = {
    initial: { 
      scale: 1,
      textShadow: `0 2px 8px ${colors.primary}80`
    },
    hover: { 
      scale: 1.02,
      textShadow: `0 4px 16px ${colors.accent}60, 0 2px 8px ${colors.primary}80`
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.nav 
      style={navStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        style={logoStyle}
        variants={logoVariants}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Inventory Manager
      </motion.h2>
      
      <motion.div 
        style={{ display: 'flex', gap: '8px' }}
        variants={itemVariants}
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ 
            duration: 0.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <Link to="/" style={linkStyle}>
            Product List
          </Link>
        </motion.div>
        
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ 
            duration: 0.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <Link to="/add" style={linkStyle}>
            Add Product
          </Link>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;