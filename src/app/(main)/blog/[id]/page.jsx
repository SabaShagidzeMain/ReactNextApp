/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { fetchPost } from "@/Utilities/fetchPost"; // Keep this if you're fetching from the API
import "./singleblog.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default function PostDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
    const localPost = localPosts.find((post) => post.id === Number(id));

    if (localPost) {
      setPost(localPost);
      setLoading(false);
    } else {
      const fetchLocalPost = async () => {
        const fetchedPost = await fetchPost(id);
        setPost(fetchedPost);
        setLoading(false);
      };
      fetchLocalPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">
          <p>...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
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
