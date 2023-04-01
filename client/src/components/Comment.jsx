import moment from "moment";
import { useContext, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { BsArrowReturnRight } from "react-icons/bs";
import CreateComment from "./CreateComment";
import { GetReplyComments } from "../services/fetch";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Comment = ({ comment, data }) => {
  const { currentUser } = useContext(AuthContext);
  const { avatar, name, content, createdComment, parentFeed, commentId, author } =
    comment;

  const [openReplyCm, setOpenReplyCm] = useState(false);
  const [showReplyCm, setShowReplyCm] = useState(false);

  const replyComments = GetReplyComments(data, commentId);

  return (
    <div className="comment">
      <div className="imgContainer">
        <Link to={`/users/${author}`} className="link">
          <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
        </Link>
      </div>

      <div className="info">
        <div className="namecontent">
          <div className="name">
            <Link to={`/users/${author}`} className="link">
              <b>{name}</b>
            </Link>
            <span>{moment(createdComment).format("MMM D")}</span>
          </div>

          <p>{content}</p>
        </div>

        <div className="details">
          <p>
            <AiOutlineHeart className="iconCm" /> <span>0 like</span>
          </p>
          {!openReplyCm ? (
            <p onClick={() => setOpenReplyCm(true)}>
              <VscComment className="iconCm" /> <span>reply</span>
            </p>
          ) : (
            <p onClick={() => setOpenReplyCm(false)}>
              <VscComment className="iconCm" />
              <span>close</span>
            </p>
          )}
          {replyComments.length > 0 && (
            <p onClick={() => setShowReplyCm(!showReplyCm)}>
              <BsArrowReturnRight className="iconScroll" />
              <span>{replyComments.length} replies</span>
            </p>
          )}
        </div>

        {openReplyCm && (
          <CreateComment
            typeBtn="Reply"
            parentFeed={parentFeed}
            author={currentUser.id}
            setOpenComment={setOpenReplyCm}
            parentId={commentId}
            setOpenReplyCm={setOpenReplyCm}
            setShowReplyCm={setShowReplyCm}
          />
        )}

        {replyComments.length > 0 &&
          replyComments.map((c) => {
            if (showReplyCm)
              return <Comment key={c.commentId} comment={c} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Comment;
