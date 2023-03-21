import moment from "moment";
import { useState } from "react";
import CreateComment from "./CreateComment";

const Comment = ({ comment, cms }) => {
  const [openComment, setOpenComment] = useState(false);

  return (
    <div className="comment">
      <div className="info">
        <img
          src={"/images/" + comment?.profilePic || "default_avatar.png"}
          alt=""
        />
        <div className="name">
          <p>{comment?.username}</p>
          <span>{moment(comment?.comment_created).fromNow()}</span>
        </div>
      </div>

      <div className="text">
        <p>{comment?.message}</p>
        {!openComment ? (
          <span onClick={() => setOpenComment(true)}>Reply</span>
        ) : (
          <span onClick={() => setOpenComment(false)}>Close</span>
        )}
        {openComment && <CreateComment />}
        <div className="listCm">
        </div>
      </div>
    </div>
  );
};

export default Comment;
