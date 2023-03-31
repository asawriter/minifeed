import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GetUsersFollowed } from "../services/fetch";
import { Link } from "react-router-dom";

const ListFriend = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data, error } = GetUsersFollowed(
    "follows",
    currentUser.id
  );

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
};

export default ListFriend;
