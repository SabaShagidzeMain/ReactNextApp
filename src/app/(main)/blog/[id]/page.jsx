/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { fetchPost } from "@/Utilities/fetchPost";
import "./singleblog.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default function PostDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
    const localPost = localPosts.find((post) => post.id === Number(id));

    if (localPost) {
      setPost(localPost);
      setLoading(false);
    } else {
      const fetchLocalPost = async () => {
        try {
          const fetchedPost = await fetchPost(id);
          if (!fetchedPost) {
            setError("Post not found.");
          } else {
            setPost(fetchedPost);
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
          <h1 className="post-title">{post.title}</h1>
          <p className="post-body">{post.body}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
