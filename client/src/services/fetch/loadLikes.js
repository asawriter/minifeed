import makeRequest from "../makeRequest";
import { useQuery } from "@tanstack/react-query";

// GET ALL LIKES
export const GetLikes = (QUERY_KEY, feedId) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/likes/${feedId}`).then((res) => res.data.likes)
    );
  } catch (error) {
    console.log(error);
  }
};

// DISLIKE
export const RemoveLiked = (feedId, userId) => {
  try {
    return makeRequest.post(`/likes/${feedId}`, {
      userLiked: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

// LIKED
export const AddLiked = (feedId, userId) => {
  try {
    return makeRequest.post("/likes", {
      userLiked: userId,
      feedLiked: feedId,
    });
  } catch (error) {
    console.log(error);
  }
};
