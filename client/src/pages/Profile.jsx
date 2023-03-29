import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GetUserProfile, GetFeedProfiles } from "../services/fetch";
import { scrollUp } from "../services/BackToTop";
import UserInfo from "../components/UserInfo";
import { BsThreeDots } from "react-icons/bs";
import Feed from "../components/Feed";
import { VscComment } from "react-icons/vsc";
import { CiHashtag } from "react-icons/ci";
import { BsFileEarmarkPostFill } from "react-icons/bs";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[2];
  const [openUpdate, setOpenUpdate] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

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
                  <button>Follow</button>
                )}
                <BsThreeDots className="icon" />
              </div>
              <img
                src={"/images/" + (data.avatar || "default_avatar.png")}
                alt=""
              />
              <h1>{data.name}</h1>
              <UserInfo bio={data.bio} createdUser={data.created_at} />
            </div>

            <div className="userContent">
              <div className="left">
                <ul>
                  <li>
                    <BsFileEarmarkPostFill className="icon" />
                    <span>147 posts published</span>
                  </li>
                  <li>
                    <VscComment className="icon" />
                    <span>21 comments written</span>
                  </li>
                  <li>
                    <CiHashtag className="icon" />
                    <span>11 tags followed</span>
                  </li>
                </ul>
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
