import "./about.css";

const About = () => {
  return (
    <>
      <main className="main about-main">
        <div className="main-right">
          <div className="main-right-wrapper bg-white dark:bg-custom-gray">
            <h3 className="text-custom-gray dark:text-white">The Witcher 3</h3>
            <p className="text-custom-gray dark:text-white">
              The Witcher 3: Wild Hunt is a 2015 action role-playing game
              developed and published by the Polish studio CD Projekt. It is the
              sequel to the 2011 game The Witcher 2: Assassins of Kings and the
              third game in The Witcher video game series, played in an open
              world with a third-person perspective. The games follow the
              Witcher series of fantasy novels written by Andrzej Sapkowski.
            </p>
            <button className="text-custom-gray bg-custom-gray dark:text-custom-gray dark:bg-white">Learn More</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
