import { useContext } from "react";
import { Link } from "react-router-dom";
import FollowButton from "../../components/FollowButton";
import UserInfo from "../../components/UserInfo";
import { AuthContext } from "../../context/AuthContext";

const FeedRightDetail = ({ author, name, createdUser, bio, avatar }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="right">
      <div className="info">
        <Link to={`/users/${author}`} className="link">
          <div className="details">
            <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
            <span>{name}</span>
          </div>
        </Link>
        {currentUser.id === author ? (
          <button>
            <Link className="link" to={`/users/${currentUser.id}/edit`}>
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
