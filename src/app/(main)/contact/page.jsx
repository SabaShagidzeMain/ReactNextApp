import "./contact.css";

const page = () => {
  return (
    <>
      <main className="main contact-main">
        <div className="contactWrapper">
          <form
            action="#"
            className="bg-white dark:bg-custom-gray dark:text-white"
          >
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

            <input type="submit" value="submit" className="dark:bg-white dark:text-custom-gray" />
          </form>
        </div>
      </main>
    </>
  );
};

export default page;
