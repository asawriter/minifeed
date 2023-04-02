import { Link } from "react-router-dom";

const CommentImg = ({ comment }) => {
  const { author, avatar } = comment;

  return (
    <div className="imgContainer">
      <Link to={`/users/${author}`} className="link">
        <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
      </Link>
    </div>
  );
};

export default CommentImg;
