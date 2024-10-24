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
  const [postToDelete, setPostToDelete] = useState(null); // For delete confirmation

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
    setPostToDelete(null); // Close confirmation after deletion
  };

  const confirmDelete = (id) => {
    setPostToDelete(id); // Set post to be deleted
  };

  const cancelDelete = () => {
    setPostToDelete(null); // Close confirmation dialog without deleting
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
                  <div className="buttons-box">
                    <Link className="blog-link Link" href={`/blog/${post.id}`}>
                      Open Post
                    </Link>
                    <button className="delete-button" onClick={() => confirmDelete(post.id)}>DELETE</button>
                  </div>

                  {/* Confirmation Dialog */}
                  {postToDelete === post.id && (
                    <div className="confirmation-dialog-overlay">
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to delete this blog post?</p>
                        <button className="confirm-button" onClick={() => handleDelete(post.id)}>
                          Yes
                        </button>
                        <button className="cancel-button" onClick={cancelDelete}>
                          No
                        </button>
                      </div>
                    </div>
                  )}
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
