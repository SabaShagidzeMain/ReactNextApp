/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { fetchUserDetails } from "@/Utilities/fetchUserDetails";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    async function loadUserDetails() {
      try {
        const userData = await fetchUserDetails();
        setUser(userData);
      } catch (err) {
        setError("Failed to load user details.");
        console.error(error, err);
      } finally {
        setLoading(false);
      }
    }

    loadUserDetails();
  }, []);

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
            {loading ? (
              <img
                src="/assets/profile-icon.png"
                alt="profile icon"
                className="profile-image"
              />
            ) : (
              user && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="profile-image"
                />
              )
            )}
          </Link>
          <LogOutBtn />
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
