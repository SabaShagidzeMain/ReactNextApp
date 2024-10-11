"use client";

import "./page.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main landing-main">
        <div className="landing-bot">
          <h1 className="landing-header">Game Store</h1>
          <p className="landing-desc">
            Join a vibrant community of gamers and dive into epic battles,
            immersive worlds, and thrilling challenges. Discover the latest
            games, explore reviews, and connect with fellow enthusiasts. Whether
            you’re a casual player or a seasoned pro, GameHub is your ultimate
            destination for all things gaming. Get Started Today!
          </p>
          <button className="landing-button">Press Here</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
