import { RxBookmark } from "react-icons/rx";
import { AiOutlineHome, AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import Feeds from "./Feeds";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Section = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="section">
      <div className="sectionContainer">
        <div className="left">
          <ul>
            <Link className="link" to="/">
              <li>
                <AiOutlineHome className="icon"/>
                <span>Home</span>
              </li>
            </Link>
            <li>
              <AiOutlineMessage className="icon"/>
              <span>Message</span>
            </li>
            <Link to="/create/post" className="link">
              <li>
                <AiOutlinePlus className="icon"/>
                <span>Create Post</span>
              </li>
            </Link>
            <Link to={`/feeds/${currentUser.id}/bookmark/all`} className="link">
              <li>
                <RxBookmark className="icon"/>
                <span>Bookmarks</span>
              </li>
            </Link>
          </ul>
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
