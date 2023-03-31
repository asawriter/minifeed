import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FollowUser, GetUsersFollowed, UnFollowUser } from "../services/fetch";

const FollowButton = ({ userId }) => {
  const { currentUser } = useContext(AuthContext);
  // HANDLE FOLLOWED
  const { isLoading, data, error } = GetUsersFollowed(
    "follows",
    currentUser.id
  );

  let dataFl = data?.map((d) => d.followed);

  const queryClient = useQueryClient();

  const mutaion = useMutation(
    (follow) => {
      if (follow) return UnFollowUser(userId, currentUser.id);
      return FollowUser(userId, currentUser.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follows"]);
      },
    }
  );

  const handleFollow = () => {
    mutaion.mutate(dataFl?.includes(userId));
  };

  return (
    <button
      onClick={handleFollow}
      style={{
        backgroundColor: dataFl?.includes(userId) && "white",
        color: dataFl?.includes(userId) && "blueviolet",
      }}
    >
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Somethings went wrongs</p>
      ) : dataFl.includes(userId) ? (
        "Following"
      ) : (
        "Follow"
      )}
    </button>
  );
};

export default FollowButton;
