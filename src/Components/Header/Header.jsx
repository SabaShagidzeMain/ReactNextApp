"use client";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="header">
      <h2>Game Store</h2>
      <nav ref={navRef}>
        <div className="link-wrapper">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/store" className="nav-link">
            Store
          </Link>
          <Link href="/profile">
            <img
              src="/assets/serious-man-thinking_1149-1328.avif"
              alt=""
              className="profile-image"
            />
          </Link>
        </div>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
