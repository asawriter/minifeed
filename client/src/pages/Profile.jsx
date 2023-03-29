import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Update from "../components/Update";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import moment from "moment";
import { GetUserProfile, GetFeedProfiles } from "../services/fetch";
import { scrollUp } from "../services/BackToTop";

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
        <div className="container">
          <div className="left">
            <img
              src={"/images/" + (data.profilePic || "default_avatar.png")}
              alt=""
            />
            <p className="username">
              Name : <span>{data.username}</span>
            </p>
            <p className="email">
              Email : <span>{data.email}</span>
            </p>
            {currentUser.username === data.username && (
              <div className="btns">
                <button onClick={() => setOpenUpdate(true)}>
                  Edit Profile
                </button>
                <button>New Post</button>
              </div>
            )}
          </div>

          <div className="right">
            {feedLoading ? (
              <p>Loading ...</p>
            ) : feedError ? (
              <p>Somethings went wrong</p>
            ) : feedData.length < 1 ? (
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                You dont't have saved feeds !!!
              </p>
            ) : (
              feedData.map((feed) => {
                return (
                  <div className="feed" key={feed.id}>
                    <div className="top">
                      <div className="top-left">
                        <img
                          src={
                            "/images/" +
                            (data.profilePic || "default_avatar.png")
                          }
                          alt=""
                        />
                        <p>
                          * Posted by
                          <span
                            style={{
                              color: "blueviolet",
                              margin: "0 5px",
                              fontSize: "14px",
                            }}
                          >
                            <Link
                              to={`/profile/${currentUser.userId}`}
                              className="link"
                            >
                              {data.username}
                            </Link>
                          </span>
                          <span style={{ fontSize: "10px" }}>
                            {moment(feed.created_at).fromNow()}
                          </span>
                        </p>
                      </div>
                      <div className="top-right">
                        {feed.saved ? (
                          <RxBookmarkFilled
                            className="icon"
                            style={{ color: "goldenrod" }}
                          />
                        ) : (
                          <RxBookmark className="icon" />
                        )}
                        <BiDotsVerticalRounded className="icon" />
                      </div>
                    </div>

                    <div className="content">
                      <p>{feed.content}</p>
                      {feed.feedImg && (
                        <div className="imgContainer">
                          <img src={"/images/" + feed.feedImg} alt="" />
                        </div>
                      )}
                    </div>
                    <Link to={`/feeds/${feed.id}`} className="link">
                      <span className="view-feed">View Feed</span>
                    </Link>
                  </div>
                );
              })
            )}
          </div>

          {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
