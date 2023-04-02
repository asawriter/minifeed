import moment from "moment";
import { Link } from "react-router-dom";

const CommentInfo = ({ comment }) => {
  const { author, name, createdComment, content } = comment;

  return (
    <div className="namecontent">
      <div className="name">
        <Link to={`/users/${author}`} className="link">
          <b>{name}</b>
        </Link>
        <span>{moment(createdComment).format("MMM D")}</span>
      </div>

      <p>{content}</p>
    </div>
  );
};

export default CommentInfo;
