/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { fetchPost } from "@/Utilities/BlogUtilities/fetchPost";
import "./singleblog.css";
import {
  loadPost,
  fetchLocalPost,
  updateLocalStorage,
} from "@/Utilities/BlogUtilities/editBlog";

const Loading = () => (
  <div className="loading-screen">
    <div className="spinner"></div>
    <p>Loading post...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="loading-screen">
    <p>{message}</p>
  </div>
);

export default function PostDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const localPost = loadPost(id);
    if (localPost) {
      setPost(localPost);
      setTitle(localPost.title);
      setBody(localPost.body);
      setLoading(false);
      return; // Early return to avoid fetching
    }

    const fetchAndSetPost = async () => {
      try {
        const fetchedPost = await fetchLocalPost(id, fetchPost);
        setPost(fetchedPost);
        setTitle(fetchedPost.title);
        setBody(fetchedPost.body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetPost();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...post, title, body };
    updateLocalStorage(updatedPost);
    setPost(updatedPost);
    setIsEditing(false);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="No blog posts found." />;

  return (
    <>
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
    </>
  );
}
