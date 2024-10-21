"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";
import AddBlog from "@/Components/AddBlog/AddBlog";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
    setPosts(savedPosts);
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => {
      const updatedPosts = prev.filter((element) => element.id !== id);
      localStorage.setItem("localPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => {
      const newId =
        prevPosts.length > 0
          ? Math.max(...prevPosts.map((post) => post.id)) + 1
          : 1;
      const updatedPosts = [...prevPosts, { ...newPost, id: newId }];
      localStorage.setItem("localPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

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
