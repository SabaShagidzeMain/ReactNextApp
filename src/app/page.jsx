"use client";

import "./page.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Landing from "../Components/Landing/Landing";

export default function Home() {
  return (
    <main className="main">
      <Header />
      <Landing />
      <Footer />
    </main>
  );
}
