import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useContext } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const SavedFeeds = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery(["savedFeeds"], () =>
    makeRequest
      .get(`/feeds/saved`)
      .then((res) => res.data.savedFeeds)
  );

  console.log(data);
  return (
    <div className="savedFeeds">
      <div className="savedFeedsContainer">
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p>Somethings went wrong</p>
        ) : data.length < 1 ? (
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            You dont't have saved feeds !!!
          </p>
        ) : (
          data.map((feed) => {
            return (
              <div className="feed" key={feed.id}>
                <div className="top">
                  <div className="top-left">
                  <img src={"/images/" + (data.profilePic || "default_avatar.png")} alt="" />
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
                          {feed.username}
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
    </div>
  );
};

export default SavedFeeds;
