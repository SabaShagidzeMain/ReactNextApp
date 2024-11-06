"use client";
import { useUser } from "@auth0/nextjs-auth0/client"; // Use `useUser` from nextjs-auth0
import { useState, useEffect } from "react";
import "./profile.css";

export default function Profile() {
  const { user, isLoading, error } = useUser(); // Use `useUser` to get user details and authentication status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      window.location.href = "/login"; // Change the route as per your setup
    } else {
      setLoading(false);
    }
  }, [user, isLoading]);

  if (loading || isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return <div>Failed to load user details.</div>;
  }

  return (
    <main className="main user-main">
      <div className="user-wrapper">
        <div className="user-picture-wrapper">
          {/* User image */}
          <img className="user-image" src={user?.picture} alt={user?.name} />
        </div>
        <div className="user-info-wrapper">
          <div className="user-info-inner">
            <div className="user-info-col">
              <div className="user-info-block">
                <label htmlFor="fname">Name</label>
                <input type="text" value={user?.name} readOnly />
              </div>
              <div className="user-info-block">
                <label htmlFor="email">Email</label>
                <input type="email" value={user?.email} readOnly />
              </div>
            </div>
            <div className="user-info-col"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
