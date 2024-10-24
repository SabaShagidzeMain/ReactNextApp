/* eslint-disable react/prop-types */
"use client";
import "./store.css";

import ProductCard from "@/Components/ProductCard/ProductCard";
import SearchSort from "@/Components/SearchSort/SearchSort";
import AddProduct from "@/Components/AddProduct/AddProduct";

import { useState, useEffect } from "react";
import {
  fetchInitialProducts,
  sortProducts,
  addNewProduct,
  handleDeleteProduct,
} from "@/Utilities/ProductUtilities/editProducts";
import Link from "next/link";

export default function Store({ searchParams }) {
  const query = searchParams.q || "";
  const sortOption = searchParams.sort || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      setIsLoading(true);
      const filteredProducts = await fetchInitialProducts(query);
      setProducts(filteredProducts);
      setIsLoading(false);
    };
    fetchProductsData();
  }, [query]);

  const sortedProducts = sortProducts(products, sortOption);

  const addNewProductHandler = (newProduct) => {
    const updatedProducts = addNewProduct(newProduct, products);
    setProducts(updatedProducts);
    setShowAddProduct(false);
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
  };

  const handleDelete = (id) => {
    const updatedProducts = handleDeleteProduct(id, products);
    setProducts(updatedProducts);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <main className="main store-main">
        <SearchSort />
        <button
          className="AddNewProduct-button"
          onClick={() => setShowAddProduct(true)}
        >
          Add New Product
        </button>

        {/* Modal for Add Product */}
        {showAddProduct && (
          <>
            {/* Modal Overlay */}
            <div
              className="modal-overlay"
              onClick={() => setShowAddProduct(false)}
            ></div>

            {/* Modal Content */}
            <div className="modal">
              <div className="modal-content">
                <span
                  className="close-modal"
                  onClick={() => setShowAddProduct(false)}
                >
                  &times;
                </span>
                <AddProduct onAdd={addNewProductHandler} />
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

              {/* Confirmation Dialog */}
              {productToDelete === product.id && (
                <>
                  {/* Modal Overlay */}
                  <div className="modal-overlay" onClick={cancelDelete}></div>

                  {/* Confirmation Dialog */}
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
    </>
  );
}
