import axios from "axios";

export const fetchProduct = async (id) => {
  if (typeof window === "undefined") return null; // Exit early if on the server

  const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  const localProduct = localProducts.find(
    (product) => product.id === Number(id)
  );

  if (localProduct) {
    return localProduct;
  }

  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
