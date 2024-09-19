// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import products from './data/products';
import './App.css';

const categories = ['All', 'Electronics', 'Clothing', 'Home Appliances'];

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Remove from cart
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  // Save cart to localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Router>
      <div className="App">
        <h1>Shopping Site</h1>

        {/* Category Tabs */}
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${category === selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product List based on selected category */}
        <Routes>
          <Route
            path="/"
            element={<ProductList products={filteredProducts} addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} addToCart={addToCart} />}
          />
        </Routes>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="cart-modal">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          </div>
        )}

        {/* Floating Cart Button */}
        <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 <span>{cartItems.length}</span>
        </button>
      </div>
    </Router>
  );
};

export default App;
