/* eslint-disable react/prop-types */
"use client";

import "./ProductCard.css";
import { FaCartArrowDown } from "react-icons/fa6";

const ProductCard = ({ title, price, image, description, stock }) => {
  return (
    <div className="productcard text-custom-gray dark:bg-custom-gray dark:text-white">
      <div className="productcard-image-wrapper">
        <img
          src={image}
          alt={`${title} product`}
          className="productcard-image"
        />
      </div>
      <div className="productcard-wrapper">
        <h3 className="productcard-header">{title}</h3>
        <h3 className="productcard-info">{description}</h3>
        <div className="productcard-bot-wrapper">
          <p className="productcard-price">{price}</p>
          <p className="productcard-stock">Stock: {stock}</p>
          <button className="productcard-button">
            <FaCartArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
