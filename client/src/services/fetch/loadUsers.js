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

export const GetUsersFollowed = (QUERY_KEY, userId) => {
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest
        .get(`/users/${userId}/follows`)
        .then((res) => res.data.followeds)
    );
  } catch (error) {
    console.log(error);
  }
};

export const FollowUser = (followed, follower) => {
  try {
    return makeRequest.post(`/users/follow`, {
      followed,
      follower,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UnFollowUser = (followed, follower) => {
  try {
    return makeRequest.post(`/users/unfollow`, {
      followed,
      follower,
    });
  } catch (error) {
    console.log(error);
  }
};
