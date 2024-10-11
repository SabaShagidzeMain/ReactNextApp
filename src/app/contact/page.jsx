import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./contact.css";

const page = () => {
  return (
    <>
      <Header />
      <main className="main contact-main">
        <div className="contactWrapper">
          <form action="#">
            <div className="input-container">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name..."
              />
            </div>
            <div className="input-container">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name..."
              />
            </div>
            <div className="input-container">
              <label htmlFor="lname">Subject</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name..."
              />
            </div>

            <div className="input-container">
              <label htmlFor="text">Write Here</label>
              <textarea
                type="text"
                id="textAr"
                name="subject"
                placeholder="..."
              />
            </div>

            <input type="submit" value="submit" />
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
