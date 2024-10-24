import axios from "axios";

export const fetchProducts = async (query = "") => {
  try {
    let url = "https://dummyjson.com/products?limit=30";
    if (query) {
      url = `https://dummyjson.com/products/search?q=${query}`;
    }
    const result = await axios.get(url);
    return result.data.products || [];
  } catch (error) {
    console.error("Error Fetching Products", error);
    return [];
  }
};
