import Feeds from "../Feeds/Feeds";
import Sidebar from "../Sidebar";
import SectionLeftSide from "./SectionLeftSide";

const Section = () => {
  return (
    <div className="section">
      <div className="sectionContainer">
        <div className="left">
          <SectionLeftSide />
        </div>

        <div className="center">
          <Feeds />
        </div>

        <div className="right">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Section;
