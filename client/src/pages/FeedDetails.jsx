import Comment from "../components/Comment";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import CreateComment from "../components/CreateComment";
import LikeComment from "../components/LikeComment";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

const FeedDetails = () => {
  const [backToTop, setBackToTop] = useState(false);
  const { currentUser, successMessage } = useContext(AuthContext);
  const feedId = useLocation().pathname?.split("/")[2];
  const [message, setMessage] = useState("");
  const [saveFeed, setSaveFeed] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const commentRef = useRef(null);

  const scrollToBottom = () => {
    commentRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery(["feed", feedId], () =>
    makeRequest.get(`/feeds/${feedId}`).then((res) => res.data.feed[0])
  );

  const {
    isLoading: cmsLoading,
    data: cms,
    error: cmsError,
  } = useQuery(["comments"], () =>
    makeRequest.get(`/comments/${feedId}`).then((res) => res.data.comments)
  );

  const mutaion = useMutation((newCm) => makeRequest.post("/comments", newCm), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleComment = (e) => {
    e.preventDefault();

    mutaion.mutate({ message, feedId, userId: currentUser.userId });
    scrollToBottom();
    setMessage("");
  };

  const {
    isLoading: savedLoading,
    data: savedData,
    error: savedError,
  } = useQuery(["savedFeeds"], () =>
    makeRequest.get(`/feeds/saved`).then((res) => res.data.saved)
  );

  const mutaion2 = useMutation(
    (saved) => {
      if (saved) {
        return makeRequest.delete(`/feeds/saved/${feedId}`).then((res) => {
          if (res.status === 200) {
            successMessage(res.data.message);
          }
        });
      } else {
        return makeRequest
          .put(`/feeds/saved/${feedId}`, { saved: saveFeed })
          .then((res) => {
            if (res.status === 200) {
              successMessage(res.data.message);
            }
          });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["savedFeeds"]);
      },
    }
  );

  const handleSavedFeed = () => {
    mutaion2.mutate(savedData?.includes(feedId));
    setSaveFeed(!saveFeed);
  };

  return (
    <div className="feedDetails">
      {backToTop && (
        <button onClick={scrollUp} className="backToTop">
          Back To Top
        </button>
      )}
      <div className="container">
        {isLoading ? (
          <p>Loading</p>
        ) : error ? (
          <p>Somethings went wrong ...</p>
        ) : (
          <>
            <div className="feed">
              <div className="top">
                <div className="top-left">
                  <img
                    src={"/images/" + (data.profilePic || "default_avatar.png")}
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
                      <Link to={`/profile/${data.userId}`} className="link">
                        {data.username}
                      </Link>
                    </span>
                    <span style={{ fontSize: "10px" }}>
                      {moment(data.created_at).fromNow()}
                    </span>
                  </p>
                </div>
                <div className="top-right">
                  {savedData?.includes(feedId) ? (
                    <RxBookmarkFilled
                      className="icon"
                      style={{ color: "goldenrod" }}
                      onClick={handleSavedFeed}
                    />
                  ) : (
                    <RxBookmark className="icon" onClick={handleSavedFeed} />
                  )}
                  <BiDotsVerticalRounded
                    className="icon"
                    onClick={() => setOpenOptions(!openOptions)}
                  />
                  {openOptions && (
                    <ul>
                      <li onClick="">Remove Feed</li>
                      <li>Options 2</li>
                      <li>Options 3</li>
                    </ul>
                  )}
                </div>
              </div>

              <Link to={`/feeds/${feedId}`} className="link">
                <div className="content">
                  <p>{data.content}</p>
                  {data.feedImg && (
                    <div className="imgContainer">
                      <img src={"/images/" + data.feedImg} alt="" />
                    </div>
                  )}
                </div>
              </Link>

              <LikeComment feedId={feedId} cms={cms} />
            </div>
            <div className="createCm">
              <p>
                Comment as <span>{currentUser.username}</span>
              </p>
              <CreateComment
                message={message}
                setMessage={setMessage}
                handleComment={handleComment}
                feedId={feedId}
                userId={currentUser.userId}
                cms={cms}
              />
            </div>

            <div className="listCm">
              {cmsLoading ? (
                <p>Loading ...</p>
              ) : cmsError ? (
                <p>Somethings went wrong ...</p>
              ) : (
                cms.map((c) => <Comment key={c.id} comment={c} cms={cms} />)
              )}
              <div ref={commentRef} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedDetails;
