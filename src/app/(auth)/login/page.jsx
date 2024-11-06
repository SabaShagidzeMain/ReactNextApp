"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

function Authorization() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      window.location.href = "/api/auth/login";
    } catch (err) {
      console.error("Login failed:", err);
      setIsError(true);
    }
  };

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
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Authorization;
