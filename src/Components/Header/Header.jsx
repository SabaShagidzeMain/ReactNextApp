"use client";
import { useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0/client"; // Use `useUser` from nextjs-auth0
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  const { user, isLoading } = useUser(); // Use `useUser` to get user details and authentication status

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      // You can redirect to the login page if needed
      window.location.href = "/login"; // Adjust the login path based on your routing
    }
  }, [user, isLoading]);

  const handleLogout = () => {
    // Log out the user and redirect them to the home page
    window.location.href = "/api/auth/logout"; // Use the logout API from nextjs-auth0
  };

  return (
    <header className="header dark:bg-custom-gray">
      <h2 className="text-custom-gray dark:text-white">Game Store</h2>
      <nav ref={navRef} className="text-custom-gray dark:bg-custom-gray">
        <div className="link-wrapper">
          <Link href="/" className="nav-link text-custom-gray dark:text-white">
            Home
          </Link>
          <Link
            href="/about"
            className="nav-link text-custom-gray dark:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="nav-link text-custom-gray dark:text-white"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="nav-link text-custom-gray dark:text-white"
          >
            Blog
          </Link>
          <Link
            href="/store"
            className="nav-link text-custom-gray dark:text-white"
          >
            Store
          </Link>
          <Link href="/profile">
            {isLoading ? (
              <img
                src="/assets/profile-icon.png"
                alt="profile icon"
                className="profile-image"
              />
            ) : (
              user && (
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="profile-image"
                />
              )
            )}
          </Link>
          {user && (
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          )}
          <ThemeToggle />
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
