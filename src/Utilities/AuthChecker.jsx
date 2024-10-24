"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [pathname, token, router]);

  if (loading) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthChecker;
