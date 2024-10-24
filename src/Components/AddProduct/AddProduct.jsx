"use client";
import { useState, useRef } from "react";
import "./AddProduct.css";

export default function AddProduct({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const thumbnailInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imageReaders).then((images) => {
      setAdditionalImages((prevImages) => [...prevImages, ...images]);
    });
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
    thumbnailInputRef.current.value = "";
  };

  const handleDeleteAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    additionalImagesInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      thumbnail,
      images: [thumbnail, ...additionalImages],
    };
    onAdd(newProduct);

    setTitle("");
    setDescription("");
    setPrice("");
    setThumbnail(null);
    setAdditionalImages([]);
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="productName-input"
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          ref={thumbnailInputRef}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdditionalImagesChange}
          ref={additionalImagesInputRef}
        />

        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>

      {thumbnail && (
        <div className="image-preview">
          <img
            src={thumbnail}
            alt="Product Thumbnail"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <span className="delete-icon" onClick={handleDeleteThumbnail}>
            &times;
          </span>
        </div>
      )}

      {additionalImages.length > 0 && (
        <div>
          {additionalImages.map((image, index) => (
            <div key={index} className="image-preview">
              <img
                src={image}
                alt={`Additional Image ${index + 1}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <span
                className="delete-icon"
                onClick={() => handleDeleteAdditionalImage(index)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
