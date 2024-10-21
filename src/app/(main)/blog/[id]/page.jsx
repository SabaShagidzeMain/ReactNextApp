/* eslint-disable react/prop-types */
import { fetchPost } from "@/Utilities/fetchPost";

import "./singleblog.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default async function PostDetail({ params }) {


  const { id } = params;

  const post = await fetchPost(id);

  if (!post) {
    return <div>Post not found.</div>;
  }

  if (params.id > 30) {
    return <div>Post Not Found</div>;
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
