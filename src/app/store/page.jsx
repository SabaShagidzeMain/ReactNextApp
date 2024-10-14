/* eslint-disable react/prop-types */
import "./store.css";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SearchSort from "@/Components/SearchSort/SearchSort";

import { fetchProducts } from "@/Utilities/fetchProducts";
import Link from "next/link";

export default async function Store({ searchParams }) {
  const query = searchParams.q || "";
  const sortOption = searchParams.sort || "";
  const products = await fetchProducts(query);

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

  if (!sortedProducts || sortedProducts.length === 0) {
    return <div>Products Not Found.</div>;
  }

  return (
    <>
      <Header />
      <main className="main store-main">
        <SearchSort />
        <div className="product-list products-wrapper">
          {sortedProducts.map((product) => (
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
}
