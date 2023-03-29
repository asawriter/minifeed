import moment from "moment";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import CreateComment from "./CreateComment";

const Comment = ({ comment }) => {
  const { avatar, name, content, createdComment, parentFeed, author } = comment;
  const [openReplyCm, setOpenReplyCm] = useState(false);

  return (
    <div className="comment">
      <div className="imgContainer">
        <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
      </div>

      <div className="info">
        <div className="namecontent">
          <div className="name">
            <b>{name}</b>
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
        </div>

        {openReplyCm && (
          <CreateComment
            typeBtn="Reply"
            parentFeed={parentFeed}
            author={author}
            setOpenComment={setOpenReplyCm}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
