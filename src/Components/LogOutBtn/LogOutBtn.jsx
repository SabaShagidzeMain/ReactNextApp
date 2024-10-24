"use client";
import "./LogOutBtn.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogOutBtn() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <button
      className="btn-logout"
      onClick={() => {
        localStorage.removeItem("accessToken");
        router.push("/login");
      }}
    >
      Logout
    </button>
  );
}
