import makeRequest from "../makeRequest";
import { useQuery } from "@tanstack/react-query";

// GET ALL LIKES
export const GetLikes = (QUERY_KEY, feedId) => {
  try {
    return useQuery([QUERY_KEY, feedId], () =>
      makeRequest.get(`/feeds/like?feedId=${feedId}`).then((res) => res.data.likes)
    );
  } catch (error) {
    console.log(error);
  }
};

// DISLIKE
export const RemoveLiked = (feedId, userId) => {
  try {
    return makeRequest.post(`/feeds/${feedId}/unlike`, {
      userLiked: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

// LIKED
export const AddLiked = (feedId, userId) => {
  try {
    return makeRequest.post(`/feeds/${feedId}/like`, {
      userLiked: userId,
      feedLiked: feedId,
    });
  } catch (error) {
    console.log(error);
  }
};
