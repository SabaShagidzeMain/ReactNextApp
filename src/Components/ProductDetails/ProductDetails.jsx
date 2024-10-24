import React from "react";

const ProductDetails = ({ product, onEdit }) => {
  return (
    <>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={onEdit} className="edit-button">
        Edit Product
      </button>
    </>
  );
};

export default ProductDetails;
