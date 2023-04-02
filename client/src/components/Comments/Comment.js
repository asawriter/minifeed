import { useContext, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { BsArrowReturnRight } from "react-icons/bs";
import CreateComment from "./CreateComment";
import { GetReplyComments } from "../../services/fetch";
import { AuthContext } from "../../context/AuthContext";
import CommentInfo from "./CommentInfo";
import CommentImg from "./CommentImg";

const Comment = ({ comment, data }) => {
  const { currentUser } = useContext(AuthContext);
  const { parentFeed, commentId } = comment;

  const [openReplyCm, setOpenReplyCm] = useState(false);
  const [showReplyCm, setShowReplyCm] = useState(false);

  const replyComments = GetReplyComments(data, commentId);

  const handleOpenReplyCm = () => {
    setOpenReplyCm(true);
  };

  const handleCloseReplyCm = () => {
    setOpenReplyCm(false);
  };

  const handleShowReplyCm = () => {
    setShowReplyCm(!showReplyCm);
  };

  return (
    <div className="comment">
      <CommentImg comment={comment} />

      <div className="info">
        <CommentInfo comment={comment} />

        <div className="details">
          <p>
            <AiOutlineHeart className="iconCm" /> <span>0 like</span>
          </p>
          {!openReplyCm ? (
            <p onClick={handleOpenReplyCm}>
              <VscComment className="iconCm" /> <span>reply</span>
            </p>
          ) : (
            <p onClick={handleCloseReplyCm}>
              <VscComment className="iconCm" />
              <span>close</span>
            </p>
          )}
          {replyComments?.length > 0 && (
            <p onClick={handleShowReplyCm}>
              <BsArrowReturnRight className="iconScroll" />
              <span>{replyComments?.length} replies</span>
            </p>
          )}
        </div>

        {openReplyCm && (
          <CreateComment
            typeBtn="Reply"
            parentFeed={parentFeed}
            author={currentUser.id}
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
