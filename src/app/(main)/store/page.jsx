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
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const savedProducts =
        JSON.parse(localStorage.getItem("localProducts")) || [];

      if (savedProducts.length === 0) {
        const fetchedProducts = await fetchProducts(query);
        localStorage.setItem("localProducts", JSON.stringify(fetchedProducts));
        setProducts(fetchedProducts);
      } else {
        setProducts(savedProducts);
      }
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

  const confirmDelete = (id) => {
    setProductToDelete(id);
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );

      const localProducts =
        JSON.parse(localStorage.getItem("localProducts")) || [];
      const updatedLocalProducts = localProducts.filter(
        (product) => product.id !== id
      );

      localStorage.setItem(
        "localProducts",
        JSON.stringify(updatedLocalProducts)
      );

      return updatedProducts;
    });
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  return (
    <>
      <Header />
      <main className="main store-main">
        <SearchSort />
        <button
          className="AddNewProduct-button"
          onClick={() => setShowAddProduct(true)}
        >
          Add New Product
        </button>

        {showAddProduct && (
          <>
            <div
              className="modal-overlay"
              onClick={() => setShowAddProduct(false)}
            ></div>

            <div className="modal">
              <div className="modal-content">
                <span
                  className="close-modal"
                  onClick={() => setShowAddProduct(false)}
                >
                  &times;
                </span>
                <AddProduct onAdd={addNewProduct} />
              </div>
            </div>
          </>
        )}

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
              <button
                className="delete-button"
                onClick={() => confirmDelete(product.id)}
              >
                Delete
              </button>

              {productToDelete === product.id && (
                <>
                  <div className="modal-overlay" onClick={cancelDelete}></div>

                  <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={() => handleDelete(product.id)}>
                      Yes
                    </button>
                    <button onClick={cancelDelete}>No</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
