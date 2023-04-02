import { GetUsersFollowed } from "../../services/fetch";
import { Link } from "react-router-dom";

const ListFriend = ({ userId }) => {
  const { isLoading, data, error } = GetUsersFollowed("follows", userId);

  if (data?.length > 0) {
    return (
      <div className="listFriend">
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p>Somethings went wrongs</p>
        ) : (
          data.map((d) => (
            <Link className="link" to={`/users/${d.followed}`} key={d.followed}>
              <div className="item">
                <img
                  src={"/images/" + (d.avatar || "default_avatar.png")}
                  alt=""
                />
                <p>{d.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    );
  } else {
    return <p>You don't follow any person.</p>;
  }
};

export default ListFriend;
