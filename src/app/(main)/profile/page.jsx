"use client";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import "./profile.css";
import { fetchUserDetails } from "@/Utilities/fetchUserDetails";

import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserDetails() {
      try {
        const userData = await fetchUserDetails();
        setUser(userData);
      } catch (err) {
        setError("Failed to load user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="loadnig__spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <main className="main user-main">
        <div className="user-wrapper">
          <div className="user-picture-wrapper">
            <img className="user-image" src={user.image} alt={user.firstName} />
          </div>
          <div className="user-info-wrapper">
            <div className="user-info-inner">
              <div className="user-info-col">
                <div className="user-info-block">
                  <label htmlFor="fname">Name</label>
                  <input type="text" value={user.firstName} readOnly />
                </div>
                <div className="user-info-block">
                  <label htmlFor="pass">Surname</label>
                  <input type="text" value={user.lastName} readOnly />
                </div>
                <div className="user-info-block">
                  <label htmlFor="email">Email</label>
                  <input type="email" value={user.email} readOnly />
                </div>
              </div>
              <div className="user-info-col"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
