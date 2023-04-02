import { Link } from "react-router-dom";
import FollowButton from "../Profiles/FollowButton";
import UserInfo from "../Profiles/UserInfo";

const FeedRightDetail = ({
  author,
  name,
  createdUser,
  bio,
  avatar,
  userId,
}) => {
  return (
    <div className="right">
      <div className="info">
        <Link to={`/users/${author}`} className="link">
          <div className="details">
            <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
            <span>{name}</span>
          </div>
        </Link>
        {userId === author ? (
          <button>
            <Link className="link" to={`/users/${userId}/edit`}>
              Edit Profile
            </Link>
          </button>
        ) : (
          <FollowButton userId={author} />
        )}
        <UserInfo name={name} createdUser={createdUser} bio={bio} />
      </div>
    </div>
  );
};

export default FeedRightDetail;
