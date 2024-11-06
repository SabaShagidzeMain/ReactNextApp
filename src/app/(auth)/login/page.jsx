"use client";
import { useUser } from "@auth0/nextjs-auth0/client"; // Use nextjs-auth0 client-side hook
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

function Authorization() {
  const { user, error, isLoading } = useUser(); // `useUser` hook from @auth0/nextjs-auth0/client
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  // If the user is authenticated, redirect to the home page
  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect if authenticated
    }
  }, [user, router]);

  // Handle login click
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      window.location.href = "/api/auth/login"; // Redirecting to the API route to handle login
    } catch (err) {
      console.error("Login failed:", err);
      setIsError(true);
    }
  };

  // Loading or error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>There was an error during login. Please try again.</h2>
      </div>
    );
  }

  return (
    <section className="login-wrapper">
      <div className="bc-image">
        <form className="form" onSubmit={handleLogin}>
          <h1>Log In</h1>
          {isError && (
            <div className="error-message">Login failed. Please try again.</div>
          )}
          <button className="login-button" type="submit">
            Log In with Auth0
          </button>
        </form>
      </div>
    </section>
  );
}

export default Authorization;
