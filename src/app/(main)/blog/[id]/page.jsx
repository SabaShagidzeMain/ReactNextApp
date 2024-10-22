"use client";

import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";
import { fetchPost } from "@/Utilities/fetchPost";
import { useState, useEffect } from "react";
import axios from "axios";
import "./singleblog.css";

// eslint-disable-next-line react/prop-types
export default function PostDetail({ params }) {
  // eslint-disable-next-line react/prop-types
  const { id } = params;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const storedPost = localStorage.getItem(`post-${id}`);

    const fetchPostData = async () => {
      const postData = storedPost ? JSON.parse(storedPost) : await fetchPost(id);
      if (postData) {
        setPost(postData);
        setTitle(postData.title);
        setBody(postData.body);
      }
      setIsLoading(false);
    };

    fetchPostData();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://dummyjson.com/posts/${id}`, {
        title,
        body,
      });

      const updatedPost = response.data;
      setPost(updatedPost);
      localStorage.setItem(`post-${id}`, JSON.stringify(updatedPost));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (isLoading) return <div>Loading post details...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <>
      <Header />
      <main className="main blogpage-main">
        <div className="post-container">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="edit-input title-input"
              />
              <textarea
                value={body}
                onChange={handleBodyChange}
                className="edit-input body-input"
              ></textarea>
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <h1 className="post-title">{title}</h1>
              <p className="post-body">{body}</p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Post</button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
