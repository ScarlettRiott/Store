// src/components/Product.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <h3>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
