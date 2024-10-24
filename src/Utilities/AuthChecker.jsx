"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthChecker = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!token && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, token, router]);

  return <div>{children}</div>;
};

export default AuthChecker;
