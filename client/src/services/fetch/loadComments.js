import makeRequest from "../makeRequest";
import { useQuery } from "@tanstack/react-query";

// GET ALL COMMENTS OF FEED
export const GetComments = (QUERY_KEY, feedId) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/comments/${feedId}`).then((res) => res.data.comments)
    );
  } catch (error) {
    console.log(error);
  }
};
