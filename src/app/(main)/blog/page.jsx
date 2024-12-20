"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddBlog from "@/Components/AddBlog/AddBlog";
import { fetchPosts } from "@/Utilities/BlogUtilities/fetchPosts";
import { apiPost } from "@/Utilities/BlogUtilities/apiPost";
import {
  fetchAndUpdatePosts,
  handleDeletePost,
  handleAddNewPost,
} from "@/Utilities/BlogUtilities/editBlogs";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchAndUpdatePosts(setPosts, setIsLoading, fetchPosts);
    }
  }, []);

  const handleDelete = (id) =>
    handleDeletePost(id, setPosts, apiPost, setPostToDelete);

  const addNewPost = (newPost) => handleAddNewPost(newPost, setPosts);

  const confirmDelete = (id) => setPostToDelete(id);
  const cancelDelete = () => setPostToDelete(null);

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
                <div className="blog-content bg-white dark:bg-custom-gray dark:text-white">
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <div className="buttons-box">
                    <Link
                      className="blog-link Link dark:text-white"
                      href={`/blog/${post.id}`}
                    >
                      Open Post
                    </Link>
                    <button
                      className="delete-button dark:bg-white dark:text-custom-gray dark:hover:text-white"
                      onClick={() => confirmDelete(post.id)}
                    >
                      DELETE
                    </button>
                  </div>

                  {postToDelete === post.id && (
                    <div className="confirmation-dialog-overlay">
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to delete this blog post?</p>
                        <button
                          className="confirm-button"
                          onClick={() => handleDelete(post.id)}
                        >
                          Yes
                        </button>
                        <button
                          className="cancel-button"
                          onClick={cancelDelete}
                        >
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
    </>
  );
}
