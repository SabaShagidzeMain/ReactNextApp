/* eslint-disable react/prop-types */
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./blog.css";

import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
  let posts = [];
  try {
    const response = await axios.get("https://dummyjson.com/posts");
    posts = response.data.posts || [];
  } catch (error) {
    console.error("Error Fetching Blog Posts:", error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>No Blog Posts Found</p>
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
