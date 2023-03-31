import { useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import CreateComment from "../components/CreateComment";
import {GetComments, GetFeedDetails} from "../services/fetch";
import { scrollUp } from "../services/BackToTop";
import FeedRightDetail from "./FeedDetails/FeedRightDetail";
import FeedImage from "../components/Feed/FeedImage";
import FeedInfo from "../components/Feed/FeedInfo";
import FeedContent from "../components/Feed/FeedContent";
import FeedActions from "../components/Feed/FeedActions";
import ListComment from "../components/Comments/ListComment";

const FeedDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const titleURL = useLocation().pathname?.split("/")[2];
  const feedId = useLocation().pathname?.split("/")[3];
  const [backToTop, setBackToTop] = useState(false);

  const scrollRef = useRef();

  const scrollToCm = () => {
    let heightToElement = scrollRef.current?.getBoundingClientRect().bottom - 306;

    window.scrollTo({
      behavior: "smooth",
      top: heightToElement,
    });
  };

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
  const { isLoading, data, error } = GetFeedDetails("feed", feedId, titleURL);

  // GET LIST COMMENTS OF FEED
  const {isLoading: loadingCm, data: dataCm, error: errorCm} = GetComments("comments", feedId)

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
            <FeedActions
              feedId={feedId}
              titleURL={titleURL}
              scrollToCm={scrollToCm}
              numCm={dataCm?.length}
            />

            <div className="center">
              <div className="feed">
                <FeedImage image={data.image} />

                <div className="feedContent">
                  <FeedInfo
                    avatar={data.avatar}
                    author={data.author}
                    name={data.name}
                    createdFeed={data.createdFeed}
                  />

                  <FeedContent title={data.title} content={data.content} />
                </div>
              </div>

              <div className="createCm" ref={scrollRef}>
                <p>
                  Comment as <span>{currentUser.name}</span>
                </p>
                <CreateComment
                  parentFeed={feedId}
                  author={currentUser.id}
                  typeBtn="Submit"
                />
              </div>

              <ListComment isLoading={loadingCm} data={dataCm} error={errorCm} />
            </div>

            <FeedRightDetail
              avatar={data.avatar}
              author={data.author}
              name={data.name}
              createdUser={data.createdUser}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FeedDetails;
