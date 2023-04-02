import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RxBookmark } from "react-icons/rx";
import { VscComment } from "react-icons/vsc";
import { AuthContext } from "../../context/AuthContext";
import { GetComments } from "../../services/fetch";
import FeedOptions from "../Feeds/FeedOptions";
import Like from "./Like";
import Bookmark from "./Bookmark";

const FeedActions = ({ feedId, titleURL, scrollToCm }) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;
  const [showOptions, setShowOptions] = useState(false);

  // GET COMMENTS OF FEED
  const { isLoading, data, error } = GetComments("comments", feedId);

  return (
    <div className="actions">
      <div className="left">
        <ul>
          <Like userId={userId} feedId={feedId} titleURL={titleURL} />
          <li>
            <VscComment className="f-icon" onClick={scrollToCm} />
            <span>
              {data?.length} {!titleURL && "comments"}
            </span>
          </li>
          <Bookmark userId={userId} feedId={feedId} />
          <li className="actionSaved">
            <BsThreeDots
              className="f-icon"
              onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && <FeedOptions setShowOptions={setShowOptions} />}
          </li>
        </ul>
      </div>

      <div className="right">
        <p>
          <RxBookmark className="f-icon" />
        </p>
      </div>
    </div>
  );
};

export default FeedActions;
