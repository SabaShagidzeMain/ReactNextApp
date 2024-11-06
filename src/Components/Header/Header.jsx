"use client";
import { useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0/client"; // Use `useUser` from nextjs-auth0
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
            {isLoading ? (
              <img
                src="/assets/profile-icon.png"
                alt="profile icon"
                className="profile-image"
              />
            ) : (
              user && (
                <img
                  src={user?.picture} // Auth0 provides `user.picture`
                  alt={user?.name} // Auth0 provides `user.name`
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
