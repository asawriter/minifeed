import { Link } from "react-router-dom";
import UserInfo from "../../components/UserInfo";

const FeedRightDetail = ({ author, name, createdUser, bio, avatar }) => {
  return (
    <div className="right">
      <div className="info">
        <Link to={`/users/${author}`} className="link">
          <div className="details">
            <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
            <span>{name}</span>
          </div>
        </Link>
        <button>Follow</button>
        <UserInfo name={name} createdUser={createdUser} bio={bio} />
      </div>
    </div>
  );
};

export default FeedRightDetail;
