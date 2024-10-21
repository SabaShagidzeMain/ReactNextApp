/* eslint-disable react/prop-types */
import { fetchPost } from "@/Utilities/fetchPost";
import "./singleblog.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default async function PostDetail({ params }) {
  const { id } = params;

  // Fetch local posts from localStorage (only in the client side)
  const localPosts =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("localPosts")) || []
      : [];

  // Fetch the post using local posts and ID
  const post = await fetchPost(id, localPosts);

  if (!post) {
    return <div>Post not found.</div>;
  }

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
