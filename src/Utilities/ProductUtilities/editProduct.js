// Function to update products in local storage
export const updateLocalProducts = (updatedProduct) => {
  const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  const updatedProducts = localProducts.map((p) =>
    p.id === updatedProduct.id ? updatedProduct : p
  );
  localStorage.setItem("localProducts", JSON.stringify(updatedProducts));
};

// Function to handle image uploads
export const handleUploadImages = async (files) => {
  const fileReaders = Array.from(files).map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  });

  return Promise.all(fileReaders);
};

// Function to initialize product data
export const initializeProductData = (fetchedProduct) => ({
  title: fetchedProduct.title,
  description: fetchedProduct.description,
  price: fetchedProduct.price,
  stock: fetchedProduct.stock,
  images: fetchedProduct.images || [],
  thumbnail: fetchedProduct.thumbnail || fetchedProduct.images[0] || "",
});
