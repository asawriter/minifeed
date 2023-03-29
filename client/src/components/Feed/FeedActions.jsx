import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RxBookmark } from "react-icons/rx";
import { VscComment } from "react-icons/vsc";

const FeedActions = () => {
  return (
    <div className="actions">
      <div className="left">
        <p>
          {/* <AiOutlineHeart className="f-icon" /> */}
          <AiFillHeart className="f-icon" />
          <span>2 likes</span>
        </p>
        <p>
          <VscComment className="f-icon" />
          <span>6 comments</span>
        </p>
      </div>

      <div className="right">
        <RxBookmark className="f-icon" />
      </div>
    </div>
  );
};

export default FeedActions;
