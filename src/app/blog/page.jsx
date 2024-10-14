import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Link from "next/link";
import { fetchPosts } from "@/Utilities/fetchPosts";
import "./blog.css";

export default async function Blog() {
  const posts = await fetchPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>No blog posts found.</p>
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
