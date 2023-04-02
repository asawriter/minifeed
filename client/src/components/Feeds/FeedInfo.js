import moment from "moment";
import { Link } from "react-router-dom";

const FeedInfo = ({ avatar, author, name, createdFeed }) => {
  return (
    <div className="info">
      <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
      <p>
        <Link to={`/users/${author}`} className="link">
          <span style={{ fontWeight: "600" }}>{name}</span>
        </Link>

        <span style={{ fontSize: "12px", fontWeight: "400" }}>
          {`${moment(createdFeed).format("MMM D")} (${moment(
            createdFeed
          ).fromNow()})`}
        </span>
      </p>
    </div>
  );
};

export default FeedInfo;
