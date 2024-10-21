import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import "./profile.css";

import { cookies } from "next/headers";

export default async function Profile() {
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

  return (
    <>
      <Header />
      <main className="main user-main">
        <div className="user-wrapper">
          <div className="user-picture-wrapper">
            <img className="user-image" src={user.image} alt={user.firstName} />
          </div>
          <div className="user-info-wrapper">
            <p className="user-header">Edit Profile</p>
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
