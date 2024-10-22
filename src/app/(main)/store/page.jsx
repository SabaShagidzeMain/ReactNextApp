/* eslint-disable react/prop-types */
"use client";
import "./store.css";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import ProductCard from "@/Components/ProductCard/ProductCard";
import SearchSort from "@/Components/SearchSort/SearchSort";
import AddProduct from "@/Components/AddProduct/AddProduct";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/Utilities/fetchProducts";
import Link from "next/link";

export default function Store({ searchParams }) {
  const query = searchParams.q || "";
  const sortOption = searchParams.sort || "";

  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("localProducts")) || [];
    const fetchInitialProducts = async () => {
      const fetchedProducts = await fetchProducts(query);
      // Merge and ensure unique products
      const allProducts = [...savedProducts, ...fetchedProducts];
      const uniqueProducts = Array.from(
        new Map(allProducts.map((item) => [item.id, item])).values()
      ); // Create a map to filter out duplicates based on 'id'

      setProducts(uniqueProducts);
    };
    fetchInitialProducts();
  }, [query]);

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

  const sortedProducts = sortProducts(products);

  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => {
      const newId =
        prevProducts.length > 0
          ? Math.max(...prevProducts.map((p) => p.id)) + 1
          : 1;
      const updatedProducts = [{ ...newProduct, id: newId }, ...prevProducts];
      localStorage.setItem("localProducts", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    setShowAddProduct(false);
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );

      // Update local storage only for local products
      const localProducts =
        JSON.parse(localStorage.getItem("localProducts")) || [];
      const updatedLocalProducts = localProducts.filter(
        (product) => product.id !== id
      );

      // Save updated local products back to local storage
      localStorage.setItem(
        "localProducts",
        JSON.stringify(updatedLocalProducts)
      );

      return updatedProducts;
    });
  };

  if (!sortedProducts || sortedProducts.length === 0) {
    return <div>Products Not Found.</div>;
  }

  return (
    <>
      <Header />
      <main className="main store-main">
        <SearchSort />
        <button onClick={() => setShowAddProduct((prev) => !prev)}>
          {showAddProduct ? "Cancel" : "Add New Product"}
        </button>
        {showAddProduct && <AddProduct onAdd={addNewProduct} />}
        <div className="product-list products-wrapper">
          {sortedProducts.map((product) => (
            <div key={product.id}>
              <Link className="product-link" href={`/store/${product.id}`}>
                <ProductCard
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail}
                  desc={product.description}
                />
              </Link>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
