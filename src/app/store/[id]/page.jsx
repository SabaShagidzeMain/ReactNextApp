/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import axios from "axios";
import "./singleproduct.css";

// Function to fetch content for a specific product
async function fetchContent(id) {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
}

// Function to generate all possible product IDs for static generation
export async function generateStaticParams() {
  // Fetch the list of all products (or just their IDs)
  const res = await axios.get("https://dummyjson.com/products");
  const products = res.data.products; // Assuming the products are returned in an array

  // Return an array of params containing all product ids
  return products.map((product) => ({
    id: product.id.toString(), // Convert to string if necessary
  }));
}

// Component to display product details
export default async function PostDetail({ params }) {
  const product = await fetchContent(params.id);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-card">
      <h1>{product.brand}</h1>
      <div className="inner-container">
        <div className="for-image">
          {/* Assuming product.images is an array */}
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`product-${index}`} />
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
  );
}
