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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("https://dummyjson.com/products");
        setProducts(result.data.products);
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="product-list products-wrapper">
          {products.map((product) => (
            <Link href={`/store/${product.id}`} key={product.id}>
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
