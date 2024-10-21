"use client";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import "./profile.css";

const Profile = () => {
  function onChange(e) {
    const inputValue = e.target.value;
    console.log(inputValue);
  }
  return (
    <>
      <Header />
      <main className="main user-main">
        <div className="user-wrapper">
          <div className="user-picture-wrapper">
            <p className="user-header">James Allan</p>
            <p className="user-handle">@James</p>
            <button className="user-button">Upload A New Picture</button>
            <p className="user-text">
              Member Since <span>29 September 2019</span>
            </p>
          </div>
          <div className="user-info-wrapper">
            <p className="user-header">Edit Profile</p>
            <div className="user-info-inner">
              <div className="user-info-col">
                <div className="user-info-block">
                  <label htmlFor="fname">First Name:</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value="John"
                    onChange={onChange}
                  />
                </div>
                <div className="user-info-block">
                  <label htmlFor="pass">Password:</label>
                  <input
                    type="password"
                    id="pass"
                    name="pass"
                    value="verysecret"
                    onChange={onChange}
                  />
                </div>
                <div className="user-info-block">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="JamesAllan@Mail.Com"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="user-info-col">
                <div className="user-info-block">
                  <label htmlFor="lname">First Name:</label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value="Allan"
                    onChange={onChange}
                  />
                </div>
                <div className="user-info-block">
                  <label htmlFor="repeat-pass">Password:</label>
                  <input
                    type="password"
                    id="repeat-pass"
                    name="prepeat-pass"
                    value="verysecret"
                    onChange={onChange}
                  />
                </div>
                <div className="user-info-block">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="confirm-email"
                    id="confirm-email"
                    name="confirm-email"
                    value="JamesAllan@Mail.Com"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <button className="user-button">Update Info</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
