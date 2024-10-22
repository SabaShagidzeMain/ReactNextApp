"use client";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";
import { fetchPosts } from "@/Utilities/fetchPosts";
import { useState, useEffect } from "react";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAndUpdatePosts = async () => {
      const fetchedPosts = await fetchPosts(); 
      setPosts(fetchedPosts);
      setIsLoading(false); 
    };

    fetchAndUpdatePosts(); 
  }, []); 

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading blog posts...</p>
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
