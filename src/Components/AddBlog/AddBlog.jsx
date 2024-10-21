"use client";
import React, { useState } from "react";

export default function AddBlog({ addNewPost }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      id: Math.random(),
      title: inputValue,
    };

    addNewPost(newObject);
    setInputValue("");
  };

  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </>
  );
}
