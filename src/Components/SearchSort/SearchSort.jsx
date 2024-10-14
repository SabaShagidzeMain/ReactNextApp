"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSort() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    const params = new URLSearchParams(window.location.search);
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="search-sort-wrapper">
      <div className="search-wrapper products-search">
        <input
          type="text"
          placeholder="Search For A Product..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div className="sort-wrapper products-sort">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}
