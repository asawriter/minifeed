import Section from "../components/Section";
import { useEffect, useState } from "react";
import { scrollUp } from "../services/BackToTop";

const Home = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  return (
    <div className="home">
      <Section />

      {backToTop && (
        <button onClick={scrollUp} className="backToTop">
          Back To Top
        </button>
      )}
    </div>
  );
};

export default Home;
