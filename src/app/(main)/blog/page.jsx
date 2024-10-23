"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";
import AddBlog from "@/Components/AddBlog/AddBlog";
import { fetchPosts } from "@/Utilities/fetchPosts";
import { apiPost } from "@/Utilities/apiPost";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndUpdatePosts = async () => {
      const savedPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
      const fetchedPosts = await fetchPosts();

      const allPosts = [...savedPosts, ...fetchedPosts];
      const usedIds = new Set();
      const normalizedPosts = allPosts.map((post) => {
        let id = post.id;
        while (usedIds.has(id)) {
          id += 1;
        }
        usedIds.add(id);
        return { ...post, id };
      });

      setPosts(normalizedPosts);
      setIsLoading(false);
    };

    if (typeof window !== "undefined") {
      fetchAndUpdatePosts();
    }
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => {
      const updatedPosts = prev.filter((element) => element.id !== id);
      localStorage.setItem("localPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
    apiPost(id, "DELETE");
  };

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => {
      const newId =
        prevPosts.length > 0
          ? Math.max(...prevPosts.map((post) => post.id)) + 1
          : 1;
      const updatedPosts = [{ ...newPost, id: newId }, ...prevPosts];
      localStorage.setItem("localPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

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
      <AddBlog addNewPost={addNewPost} />
      <main className="main">
        <div className="blog-inner-container">
          {posts.length === 0 ? (
            <div className="loading-screen">
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
