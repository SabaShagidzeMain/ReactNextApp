import { cookies } from "next/headers";

export async function fetchUserDetails() {
  const userCookies = cookies();
  const accessToken = userCookies.get("accessToken")?.value;

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const user = await res.json();
  return user;
}
