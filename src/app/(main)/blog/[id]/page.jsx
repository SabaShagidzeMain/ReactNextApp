/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { fetchPost } from "@/Utilities/fetchPost";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import "./singleblog.css";

export default function PostDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
    const localPost = localPosts.find((post) => post.id === Number(id));

    if (localPost) {
      setPost(localPost);
      setTitle(localPost.title);
      setBody(localPost.body);
      setLoading(false);
    } else {
      const fetchLocalPost = async () => {
        try {
          const fetchedPost = await fetchPost(id);
          if (!fetchedPost) {
            setError("Post not found.");
          } else {
            setPost(fetchedPost);
            setTitle(fetchedPost.title);
            setBody(fetchedPost.body);
          }
        } catch {
          setError("Error fetching post.");
        } finally {
          setLoading(false);
        }
      };
      fetchLocalPost();
    }
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...post,
      title,
      body,
    };

    // Update local storage
    const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
    const updatedLocalPosts = localPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    localStorage.setItem("localPosts", JSON.stringify(updatedLocalPosts));

    setPost(updatedPost);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="loading-screen">
        <p>No blog posts found.</p>
      </div>
    );
  }

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
              <button type="submit" className="save-button">
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h1 className="post-title">{title}</h1>
              <p className="post-body">{body}</p>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
