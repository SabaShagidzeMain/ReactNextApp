export async function fetchUserDetails() {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = await res.json();
  return user;
}
