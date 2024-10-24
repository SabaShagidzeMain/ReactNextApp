/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/Utilities/fetchProduct";
import "./singleproduct.css";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await fetchProduct(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setOriginalProduct(fetchedProduct);
        setTitle(fetchedProduct.title);
        setDescription(fetchedProduct.description);
        setPrice(fetchedProduct.price);
        setStock(fetchedProduct.stock);
        setImages(fetchedProduct.images || []);
        setThumbnail(
          fetchedProduct.thumbnail || fetchedProduct.images[0] || ""
        );
      } else {
        console.error("Product not found");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });

    if (images[index] === thumbnail) {
      setThumbnail(images[0] || "");
    }
  };

  const handleUploadImage = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((newImages) => {
      setImages((prevImages) => [...prevImages, ...newImages]);
      if (!thumbnail && newImages.length > 0) {
        setThumbnail(newImages[0]);
      }
    });
  };

  const handleThumbnailSelect = (image) => {
    setThumbnail(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      title,
      description,
      price,
      stock,
      images,
      thumbnail,
    };

    const localProducts =
      JSON.parse(localStorage.getItem("localProducts")) || [];
    const updatedProducts = localProducts.map((p) =>
      p.id === product.id ? updatedProduct : p
    );
    localStorage.setItem("localProducts", JSON.stringify(updatedProducts));

    setProduct(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (originalProduct) {
      setTitle(originalProduct.title);
      setDescription(originalProduct.description);
      setPrice(originalProduct.price);
      setStock(originalProduct.stock);
      setImages(originalProduct.images || []);
      setThumbnail(
        originalProduct.thumbnail || originalProduct.images[0] || ""
      ); // Reset thumbnail
    }
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <main className="main main-card">
        <div className="singleproduct-inner">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="edit-input"
                placeholder="Product Title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="edit-input"
                placeholder="Product Description"
              ></textarea>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="edit-input"
                placeholder="Price"
              />
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="edit-input"
                placeholder="Stock"
              />

              <div className="image-preview">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`image-container ${
                      image === thumbnail ? "selected-thumbnail" : ""
                    }`}
                    onClick={() => handleThumbnailSelect(image)}
                  >
                    <img
                      src={image}
                      alt={`Product Image ${index}`}
                      className="image-thumb"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(index);
                      }}
                      className="delete-button"
                    >
                      &times;
                    </button>
                    {image === thumbnail && (
                      <span className="thumbnail-label">Thumbnail</span>
                    )}
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUploadImage}
                className="upload-input"
              />

              <button type="submit" className="save-button">
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <div className="image-preview ">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index}`}
                    className={`image-thumb ${
                      image === product.thumbnail ? "selected-thumbnail" : ""
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Product
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
