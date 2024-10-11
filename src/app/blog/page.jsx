"use client";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./blog.css";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    try {
      axios.get("https://dummyjson.com/posts").then((result) => {
        setPosts(result.data.posts);
      });
    } catch {
      console.error("Blogs Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(getPosts, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="blog-inner-container">
          {posts.map((post) => (
            <div className="blog-list" key={post.id}>
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Link className="blog-link Link" href={`/blog/${post.id}`}>
                  Open Post
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
