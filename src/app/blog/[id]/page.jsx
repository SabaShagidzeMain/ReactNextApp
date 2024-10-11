/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./singleblog.css";

export default function PostDetail({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/posts/${params.id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  if (params.id > 30) {
    return <div>Post Not Found</div>;
  }

  return (
    <div className="main-container">
      <div className="post-container">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-body">{post.body}</p>
      </div>
    </div>
  );
}
