import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import "./about.css";

const About = () => {
  return (
    <>
      <Header />
      <main className="main about-main">
        <div className="main-right">
          <div className="main-right-wrapper">
            <h3>The Witcher 3</h3>
            <p>
              The Witcher 3: Wild Hunt is a 2015 action role-playing game
              developed and published by the Polish studio CD Projekt. It is the
              sequel to the 2011 game The Witcher 2: Assassins of Kings and the
              third game in The Witcher video game series, played in an open
              world with a third-person perspective. The games follow the
              Witcher series of fantasy novels written by Andrzej Sapkowski.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
