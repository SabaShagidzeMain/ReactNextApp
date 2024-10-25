/* eslint-disable react/prop-types */

import Image from "next/image";

const ProductDetails = ({ product, onEdit }) => {
  return (
    <>
      <Image
        src={product.thumbnail}
        alt={`${product.title} thumbnail`}
        width={300}
        height={300}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>

      <div className="image-gallery">
        {product.images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${product.title} image ${index + 1}`}
            width={100}
            height={100}
            className="gallery-image"
          />
        ))}
      </div>

      <button onClick={onEdit} className="edit-button">
        Edit Product
      </button>
    </>
  );
};

export default ProductDetails;
