import makeRequest from "../makeRequest";
import { useQuery } from "@tanstack/react-query";

// GET ALL FEEDS
export const GetAllFeeds = (QUERY_KEY) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get("/feeds").then((res) => res.data.feeds)
    );
  } catch (error) {
    console.log(error);
  }
};

// GET FEED DETAILS
export const GetFeedDetails = (QUERY_KEY, feedId, titleURL) => {
  try {
    return useQuery([QUERY_KEY, feedId], () =>
      makeRequest
        .get(`/feeds/${titleURL}/${feedId}`)
        .then((res) => res.data.feed[0])
    );
  } catch (error) {
    console.log(error);
  }
};

// GET FEED OF PROFILE
export const GetFeedProfiles = (QUERY_KEY, userId) => {
  try {
    return useQuery([QUERY_KEY, userId], () =>
      makeRequest.get(`/feeds/user/${userId}`).then((res) => res.data.feeds)
    );
  } catch (error) {
    console.log(error);
  }
};

// CREATE NEW FEED
export const CreateFeed = (newFeed, successMessage) => {
  try {
    return makeRequest.post("/feeds", newFeed).then((res) => {
      if (res.status === 200) {
        successMessage(res.data.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// REMOVE FEED
export const RemoveFeed = (feedId, successMessage) => {
  try {
    return makeRequest
      .delete(`/feeds/${feedId}`)
      .then((res) => res.status === 200 && successMessage(res.data.message));
  } catch (error) {
    console.log(error);
  }
};

// GET EVERY FEED BOOKMARKED
export const GetFeedsBookmark = (QUERY_KEY, feedId) => {
  try {
    return useQuery([QUERY_KEY, feedId], () =>
      makeRequest.get(`/feeds/bookmark?feedId=${feedId}`).then((res) => res.data.feedsBookmark)
    );
  } catch (error) {
    console.log(error);
  }
};

// GET ALL FEEDS BOOKMARKED
export const GetAllFeedsBookmark = (QUERY_KEY, userId) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/feeds/${userId}/bookmark/all`).then((res) => res.data.feedsBookmark)
    );
  } catch (error) {
    console.log(error);
  }
};

// ADD FEED BOOKMARK
export const AddBookmark = (userId, feedId) => {
  console.log(userId, feedId);
  try {
    return makeRequest.post(`/feeds/${userId}/bookmark`, {
      userBookmarked : userId,
      feedBookmarked : feedId
    });
  } catch (error) {
    console.log(error);
  }
};

// UN BOOKMARK
export const RemoveBookmark = (userId, feedId) => {
  try {
    return makeRequest.post(`/feeds/${feedId}/unbookmark`, {
      userBookmarked : userId,
    });
  } catch (error) {
    console.log(error);
  }
};
