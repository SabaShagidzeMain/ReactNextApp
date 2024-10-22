"use client";

import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";
import { fetchPost } from "@/Utilities/fetchPost";
import { useState, useEffect } from "react";
import "./singleblog.css";

// eslint-disable-next-line react/prop-types
export default function PostDetail({ params }) {
  // eslint-disable-next-line react/prop-types
  const { id } = params;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await fetchPost(id);
      setPost(postData);
      setIsLoading(false); 
    };

    fetchPostData();  
  }, [id]); 

  if (isLoading) return <div>Loading post details...</div>;
  if (!post) return <div>Post not found.</div>;

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
