/* eslint-disable react/prop-types */
"use client"; // Mark the component as a client component
import { useEffect, useState } from "react";
import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";

import { fetchProduct } from "@/Utilities/fetchProduct";
import "./singleproduct.css";

export default function PostDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await fetchProduct(id);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (!product) {
    return <div>Product not found.</div>; // Handle the case where the product is not found
  }

  return (
    <>
      <Header />
      <main className="main main-card">
        <div className="singleproduct-inner">
          <h1>{product.brand}</h1>
          <div className="inner-container">
            <div className="product-image-wrapper">
              {Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    className="product-image"
                    key={index}
                    src={image}
                    alt={`product-${index}`}
                  />
                ))
              ) : (
                <p>No images available.</p> // Handle case where there are no images
              )}
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
