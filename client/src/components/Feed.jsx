import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import moment from "moment";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";

const Feed = ({ feed }) => {
  const {
    feedId,
    username,
    createdFeed,
    content,
    feedImg,
    userId,
    profilePic,
  } = feed;
  const { currentUser, successMessage } = useContext(AuthContext);
  const [openOptions, setOpenOptions] = useState(false);
  const [saveFeed, setSaveFeed] = useState(false);

  const queryClient = useQueryClient();

  const mutaion2 = useMutation(
    () => {
      return makeRequest.delete(`/feeds/${feedId}`).then((res) => {
        if (res.status === 200) {
          successMessage(res.data.message);
        }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feeds"]);
      },
    }
  );

  const handleRemove = () => {
    if (currentUser.userId === userId) {
      mutaion2.mutate();
    }
  };

  return (
    <div className="feed">
      <div className="top">
        <div className="top-left">
          <img src={"/images/" + (profilePic || "default_avatar.png")} alt="" />
          <p>
            * Posted by
            <span
              style={{ color: "blueviolet", margin: "0 5px", fontSize: "14px" }}
            >
              <Link to={`/profile/${userId}`} className="link">
                {username}
              </Link>
            </span>
            <span style={{ fontSize: "10px" }}>
              {moment(createdFeed).fromNow()}
            </span>
          </p>
        </div>
        <div className="top-right">
          {saveFeed ? (
            <RxBookmarkFilled
              className="icon"
              style={{ color: "goldenrod" }}
              onClick={() => setSaveFeed(false)}
            />
          ) : (
            <RxBookmark className="icon" onClick={() => setSaveFeed(true)} />
          )}
          <BiDotsVerticalRounded
            className="icon"
            onClick={() => setOpenOptions(!openOptions)}
          />
          {openOptions && (
            <ul onClick={() => setOpenOptions(false)}>
              <li onClick={handleRemove}>Remove Feed</li>
              <li>Options 2</li>
              <li>Options 3</li>
            </ul>
          )}
        </div>
      </div>

      <div className="content">
        <p>{content}</p>
        {feedImg && (
          <div className="imgContainer">
            <img src={"/images/" + feedImg} alt="" />
          </div>
        )}
      </div>
      <Link to={`/feeds/${feedId}`} className="link">
        <span className="view-feed">View Feed</span>
      </Link>
    </div>
  );
};

export default Feed;
