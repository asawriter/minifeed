import Comment from "../components/Comment";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import CreateComment from "../components/CreateComment";
import LikeComment from "../components/LikeComment";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import {
  AddSavedFeed,
  GetComments,
  GetFeedDetails,
  GetSaved,
  RemoveSavedFeed,
} from "../services/fetch";
import { scrollUp } from "../services/BackToTop";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import FeedRightDetail from "./FeedDetails/FeedRightDetail";
import FeedImage from "../components/Feed/FeedImage";
import FeedInfo from "../components/Feed/FeedInfo";
import FeedContent from "../components/Feed/FeedContent";
import FeedActions from "../components/Feed/FeedActions";
import ListComment from "../components/Comments/ListComment";

const FeedDetails = () => {
  const { currentUser, successMessage } = useContext(AuthContext);
  const titleURL = useLocation().pathname?.split("/")[2];
  const feedId = useLocation().pathname?.split("/")[3];
  const [backToTop, setBackToTop] = useState(false);
  const [saveFeed, setSaveFeed] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [isReply, setIsReply] = useState(false);

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
  // const { data: savedData } = GetSaved("savedFeeds");

  // const queryClient = useQueryClient();

  // // HANDLE SAVED FEED
  // const mutaionSaved = useMutation(
  //   async (saved) =>
  //     saved
  //       ? await RemoveSavedFeed(successMessage, feedId)
  //       : await AddSavedFeed(successMessage, feedId, saveFeed),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["savedFeeds"]);
  //     },
  //   }
  // );
  // const handleSavedFeed = () => {
  //   mutaionSaved.mutate(savedData?.includes(feedId));
  //   setSaveFeed(!saveFeed);
  // };

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
            <div className="left">
              <ul>
                <li>
                  <AiOutlineHeart className="icon" />
                  <span>2</span>
                </li>
                <li>
                  <VscComment className="icon" />
                  <span>2</span>
                </li>
                <li>
                  <RxBookmark className="icon" />
                  <span>2</span>
                </li>
                <li>
                  <BsThreeDots className="icon" />
                  <span>2</span>
                </li>
              </ul>
            </div>

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

              <div className="createCm">
                <p>
                  Comment as <span>{currentUser.name}</span>
                </p>
                <CreateComment parentFeed={feedId} author={currentUser.id}/>
              </div>

              <ListComment feedId={feedId} />
            </div>
            <FeedRightDetail />
          </>
        )}
      </div>
    </div>
  );
};

export default FeedDetails;
