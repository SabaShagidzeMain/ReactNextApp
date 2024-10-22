"use client";
import { apiPost } from "@/Utilities/apiPost";
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
      title: inputValue,
      body: bodyValue,
    };

    apiPost(newObject, "POST");
    addNewPost(newObject);
    setInputValue("");
    setBodyValue("");
  };

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
