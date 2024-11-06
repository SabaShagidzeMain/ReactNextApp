"use client";

import "./page.css";
import "./globals.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main landing-main">
        <div className="landing-bot bg-white dark:bg-custom-gray">
          <h1 className="landing-header text-custom-gray dark:text-white">Game Store</h1>
          <p className="landing-desc text-custom-gray dark:text-white">
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
