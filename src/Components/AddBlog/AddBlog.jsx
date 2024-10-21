"use client";
import React, { useState } from "react";

export default function AddBlog({ addNewPost }) {
  const [inputValue, setInputValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "" || bodyValue.trim() === "") {
      alert("Both title and body are required.");
      return;
    }

    const newObject = {
      id: Math.random(),
      title: inputValue,
      body: bodyValue,
    };

    addNewPost(newObject);
    setInputValue("");
    setBodyValue("");
  };

  const handleDelete = (id) => {
    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter body"
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
    </>
  );
}
