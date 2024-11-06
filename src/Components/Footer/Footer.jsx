import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer dark:bg-custom-gray">
      <div className="footer-wrapper">
        <div className="footer-left">
          <p className="text-custom-gray dark:text-white">I love Videogames</p>
        </div>
        <div className="footer-mid">
          <p className="text-custom-gray dark:text-white">
            All Rights Reserved @2023
          </p>
        </div>
        <div className="footer-right">
          <p className="text-custom-gray dark:text-white">
            Contact: Contact.Sabashagidze@Gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
