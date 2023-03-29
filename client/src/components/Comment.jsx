import moment from "moment";
import { useState } from "react";
import { GetComments } from "../services/fetch";
import ReplyComment from "./ReplyComment";

const Comment = ({comment}) => {
  const {avatar, name, content, createdComment} = comment;
  const [openComment, setOpenComment] = useState(false);

  const { isLoading, data, error } = GetComments("replyCms", comment.parentId);

  console.log(data);

  return (
    <div className="comment">
      <div className="imgContainer">
        <img
          src={"/images/" + avatar || "default_avatar.png"}
          alt=""
        />
      </div>
      <div className="info">
        <div className="name">
          <span>{name}</span>
          <p>{content}</p>
        </div>

        <div className="details">
          <span>{moment(createdComment).fromNow()}</span>
          {!openComment ? (
            <span onClick={() => setOpenComment(true)}>Reply</span>
          ) : (
            <span onClick={() => setOpenComment(false)}>Close</span>
          )}
        </div>

        {openComment && (
          <ReplyComment
            feedId={comment.parentId}
          
            setOpenComment={setOpenComment}
          />
        )}
        {/* <div className="replyCms">{isReply && <Comment />}</div> */}
      </div>
    </div>
  );
};

export default Comment;
