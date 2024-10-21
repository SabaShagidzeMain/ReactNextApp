"use client";
import React, { useState, useEffect } from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";
import { fetchPosts } from "@/Utilities/fetchPosts";
import AddBlog from "@/Components/AddBlog/AddBlog";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((element) => element.id !== id));
  };

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts || []);
    };
    getPosts();
  }, []);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  console.log(posts);
  return (
    <>
      <Header />
      <AddBlog addNewPost={addNewPost} />
      <main className="main">
        <div className="blog-inner-container">
          {posts.length === 0 ? (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>No blog posts found.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div className="blog-list" key={post.id}>
                <div className="blog-content">
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <Link className="blog-link Link" href={`/blog/${post.id}`}>
                    Open Post
                  </Link>
                  <button onClick={() => handleDelete(post.id)}>DELETE</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
