import { BsFileImage } from "react-icons/bs";
import { TiAttachmentOutline } from "react-icons/ti";
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
          <Link className="link" to="/create/post">
            <div className="create">
              <div className="avatar">
                <img src={currentUser.profilePic} alt="" />
              </div>
              <input type="text" placeholder="Create Post" readOnly />
              <BsFileImage style={{ fontSize: "22px", cursor: "pointer" }} />
              <TiAttachmentOutline
                style={{
                  fontSize: "22px",
                  cursor: "pointer",
                  marginLeft: "-10px",
                }}
              />
            </div>
          </Link>

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
