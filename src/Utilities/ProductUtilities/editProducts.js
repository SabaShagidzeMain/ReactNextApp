// editProducts.js

export const fetchInitialProducts = async (query) => {
  const savedProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  let fetchedProducts = [];
  if (savedProducts.length === 0) {
    fetchedProducts = await fetchProducts(query);
  }
  const allProducts = [...savedProducts, ...fetchedProducts];
  const uniqueProducts = Array.from(
    new Map(allProducts.map((item) => [item.id, item])).values()
  );
  return uniqueProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const sortProducts = (products, sortOption) => {
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

export const addNewProduct = (newProduct, products) => {
  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const updatedProducts = [{ ...newProduct, id: newId }, ...products];
  localStorage.setItem("localProducts", JSON.stringify(updatedProducts));
  return updatedProducts;
};

export const handleDeleteProduct = (id, products) => {
  const updatedProducts = products.filter((product) => product.id !== id);
  const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  const updatedLocalProducts = localProducts.filter(
    (product) => product.id !== id
  );
  localStorage.setItem("localProducts", JSON.stringify(updatedLocalProducts));
  return updatedProducts;
};
