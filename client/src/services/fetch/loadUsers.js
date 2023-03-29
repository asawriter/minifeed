import makeRequest from "../makeRequest";
import { useQuery } from "@tanstack/react-query";

// GET INFO USER PROFILE
export const GetUserProfile = (QUERY_KEY, userId) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest.get(`/users/${userId}`).then((res) => res.data.user[0])
    );
  } catch (error) {
    console.log(error);
  }
};
