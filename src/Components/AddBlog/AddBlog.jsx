"use client";
import { useState } from "react";
import { apiPost } from "@/Utilities/apiPost";
import "./AddBlog.css";

export default function AddBlog({ addNewPost }) {
  const [inputValue, setInputValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(false);
  };

  return (
    <>
      <header className="addPost-header">
        <button className="show-form-button" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Close" : "Add Post"}
        </button>
      </header>
      <div className={`form-container ${isVisible ? "visible" : "hidden"}`}>
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
      </div>
    </>
  );
}
