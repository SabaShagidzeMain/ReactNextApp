/* eslint-disable react/prop-types */
"use client";

import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import "./singleproduct.css";

export default function PostDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${params.id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching the product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  if (params.id > 30) {
    return <div>Product Not Found</div>;
  }

  return (
    <>
      <Header />
      <main className="main main-card">
        <div className="singleproduct-inner">
          <h1>{product.brand}</h1>
          <div className="inner-container">
            <div className="product-image-wrapper">
              {product.images.map((image, index) => (
                <img
                  className="product-image"
                  key={index}
                  src={image}
                  alt={`product-${index}`}
                />
              ))}
            </div>
            <div className="info-container">
              <h2>Rating: {product.rating}⭐</h2>
              <h1 className="title">{product.title}</h1>
              <p className="availability">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <h3>Price: {product.price}$</h3>
              <p className="description">{product.description}</p>
              <button className="button">Add To The Cart</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
