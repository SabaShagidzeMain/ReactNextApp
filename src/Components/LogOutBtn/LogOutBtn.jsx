"use client";
import "./LogOutBtn.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogOutBtn() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <button
      className="btn-logout"
      onClick={() => {
        Cookies.remove("accessToken");
        router.push("/login");
      }}
    >
      Logout
    </button>
  );
}
