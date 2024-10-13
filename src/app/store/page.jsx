"use client";

import "./store.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch products based on search term or initial load
  const fetchProducts = async (query = "") => {
    try {
      let url = "https://dummyjson.com/products?limit=30"; // Fetch all products by default
      if (query) {
        url = `https://dummyjson.com/products/search?q=${query}`; // Search if there's a query
      }
      const result = await axios.get(url);
      setProducts(result.data.products || []);
    } catch (error) {
      console.error("Error Fetching Products", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for search bar
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query); // Update the search term
    fetchProducts(query); // Call fetchProducts with the search term
  };

  // Initial fetch of all products when the component mounts
  useEffect(() => {
    fetchProducts(); // Fetch initial products on mount
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div>Products Not Found.</div>;
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="search-sort-wrapper">
          <div className="search-wrapper products-search">
            <input
              type="text"
              placeholder="Search For A Product..."
              value={searchTerm}
              onChange={handleInputChange} // Calls the handleInputChange correctly
            />
          </div>
        </div>
        <div className="product-list products-wrapper">
          {products.map((product) => (
            <Link
              className="product-link"
              href={`/store/${product.id}`}
              key={product.id}
            >
              <ProductCard
                title={product.title}
                price={product.price}
                image={product.thumbnail}
                desc={product.description}
              />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Store;
