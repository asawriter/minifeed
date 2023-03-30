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

// GET FEED SAVED
export const GetFeedSaveds = (QUERY_KEY) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/feeds/saved`).then((res) => res.data.savedFeeds)
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetSaved = (QUERY_KEY) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/feeds/saved`).then((res) => res.data.saved)
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

// ADD FEED SAVED
export const AddSavedFeed = (successMessage, feedId, saveFeed) => {
  try {
    return makeRequest
      .put(`/feeds/saved/${feedId}`, { saved: saveFeed })
      .then((res) => res.status === 200 && successMessage(res.data.message));
  } catch (error) {
    console.log(error);
  }
};

// REMOVE FEED SAVED
export const RemoveSavedFeed = (successMessage, feedId) => {
  try {
    return makeRequest
      .delete(`/feeds/saved/${feedId}`)
      .then((res) => res.status === 200 && successMessage(res.data.message));
  } catch (error) {
    console.log(error);
  }
};
