"use client";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./blog.css";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("https://dummyjson.com/posts").then((result) => {
      setPosts(result.data.posts);
    });
  };

  useEffect(getPosts, []);

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
                <Link className="Link" href={`/blog/${post.id}`}>
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
};

export default Blog;
