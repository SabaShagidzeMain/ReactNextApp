"use client";

import "./store.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async (query = "") => {
    try {
      let url = "https://dummyjson.com/products?limit=30";
      if (query) {
        url = `https://dummyjson.com/products/search?q=${query}`;
      }
      const result = await axios.get(url);
      setProducts(result.data.products || []);
    } catch (error) {
      console.error("Error Fetching Products", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedFetchProducts(query);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortProducts = (products) => {
    if (sortOption === "price-asc") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "name-desc") {
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    }
    return products;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts((prevProducts) => sortProducts(prevProducts));
  }, [sortOption]);

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
              onChange={handleInputChange}
            />
          </div>

          <div className="sort-wrapper products-sort">
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
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
