/* eslint-disable react/prop-types */
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

import { fetchProduct } from "@/Utilities/fetchProduct";
import "./singleproduct.css";

export default async function PostDetail({ params }) {
  const { id } = params;

  const product = await fetchProduct(id);

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

// Test