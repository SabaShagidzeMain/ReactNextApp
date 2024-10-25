/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/Utilities/ProductUtilities/fetchProduct";
import {
  updateLocalProducts,
  handleUploadImages,
  initializeProductData,
} from "@/Utilities/ProductUtilities/editProduct";
import ImagePreview from "@/Components/ImagePreview/ImagePreview.";
import ProductForm from "@/Components/ProductForm/ProductForm";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import "./singleproduct.css";

export default function ProductDetail({ params }) {
  console.log("params:", params)
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    thumbnail: "",
  });
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await fetchProduct(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setOriginalProduct(fetchedProduct);
        setProductData(initializeProductData(fetchedProduct));
      } else {
        console.error("Product not found");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleDeleteImage = (index) => {
    setProductData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      const newThumbnail = updatedImages[0] || "";
      return {
        ...prev,
        images: updatedImages,
        thumbnail:
          prev.thumbnail === prev.images[index] ? newThumbnail : prev.thumbnail,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const newImages = await handleUploadImages(e.target.files);
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
      thumbnail: prev.thumbnail || newImages[0] || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, ...productData };
    updateLocalProducts(updatedProduct);
    setProduct(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (originalProduct) {
      setProductData(initializeProductData(originalProduct));
    }
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <main className="main main-card">
      <div className="singleproduct-inner">
        {isEditing ? (
          <>
            <ProductForm
              productData={productData}
              setProductData={setProductData}
              onUpload={handleUploadImage}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
            <ImagePreview
              images={productData.images}
              thumbnail={productData.thumbnail}
              onDelete={handleDeleteImage}
              onSelect={(image) =>
                setProductData({ ...productData, thumbnail: image })
              }
            />
          </>
        ) : (
          <ProductDetails product={product} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </main>
  );
}
