import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GetUserProfile, GetFeedProfiles } from "../services/fetch";
import { scrollUp } from "../services/BackToTop";
import UserInfo from "../components/Profiles/UserInfo";
import { BsThreeDots } from "react-icons/bs";
import Feed from "../components/Feeds/Feed";
import FollowButton from "../components/Profiles/FollowButton";
import ListFriend from "../components/Profiles/ListFriend";
import ProfileNumbers from "../components/Profiles/ProfileNumbers";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [backToTop, setBackToTop] = useState(false);
  const userId = useLocation().pathname.split("/")[2];

  // BUTTON SCROLL TO TOP
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  // GET DATA
  const { isLoading, data, error } = GetUserProfile("users", userId);

  const {
    isLoading: feedLoading,
    data: feedData,
    error: feedError,
  } = GetFeedProfiles("feeds", userId);

  return (
    <div className="profile">
      {backToTop && (
        <button onClick={scrollUp} className="backToTop">
          Back To Top
        </button>
      )}

      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Somethings wents wrong ...</p>
      ) : (
        <>
          <div className="background"></div>
          <div className="container">
            <div className="userMain">
              <div className="userActions">
                {currentUser.id === userId ? (
                  <button>
                    <Link className="link" to={`/users/${userId}/edit`}>
                      Edit Profile
                    </Link>
                  </button>
                ) : (
                  <FollowButton userId={userId} />
                )}
                <BsThreeDots className="icon" />
              </div>

              <img
                src={"/images/" + (data.avatar || "default_avatar.png")}
                alt=""
              />
              <h1>{data.name}</h1>
              <UserInfo
                bio={data.bio}
                createdUser={data.created_at}
                userId={userId}
              />
            </div>

            <div className="userContent">
              <div className="left">
                <ProfileNumbers />
                {currentUser.id === userId && (
                  <>
                    <h2>List Following</h2>
                    <ListFriend userId={currentUser.id} />
                  </>
                )}
              </div>
              <div className="right">
                {feedLoading ? (
                  <p>Loading</p>
                ) : feedError ? (
                  <p>Somethings went wrong ...</p>
                ) : (
                  feedData.map((feed) => {
                    return <Feed key={feed.feedId} feed={feed} />;
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
