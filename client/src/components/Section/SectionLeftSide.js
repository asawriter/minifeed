import { useContext } from "react";
import { AiOutlineHome, AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { RxBookmark } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SectionLeftSide = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <ul>
      <Link className="link" to="/">
        <li>
          <AiOutlineHome className="icon" />
          <span>Home</span>
        </li>
      </Link>
      <li>
        <AiOutlineMessage className="icon" />
        <span>Message</span>
      </li>
      <Link to="/create/post" className="link">
        <li>
          <AiOutlinePlus className="icon" />
          <span>Create Post</span>
        </li>
      </Link>
      <Link to={`/feeds/${currentUser.id}/bookmark/all`} className="link">
        <li>
          <RxBookmark className="icon" />
          <span>Bookmarks</span>
        </li>
      </Link>
    </ul>
  );
};

export default SectionLeftSide;
