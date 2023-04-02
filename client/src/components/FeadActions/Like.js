import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AddLiked, GetLikes, RemoveLiked } from "../../services/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Like = ({ feedId, titleURL, userId }) => {
  const queryClient = useQueryClient();

  // GET LIKES OF EVERY FEED
  const { isLoading, data, error } = GetLikes("likes", feedId);

  // HANDLE LIKE AND DISLIKE
  const mutaionLiked = useMutation(
    (liked) => {
      if (liked) return RemoveLiked(feedId, userId);
      return AddLiked(feedId, userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  
  const handleLiked = () => {
    mutaionLiked.mutate(data?.includes(userId));
  };

  return (
    <li>
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Somthing went wrong</p>
      ) : data?.includes(userId) ? (
        <AiFillHeart
          className="f-icon"
          onClick={handleLiked}
          style={{ color: "red" }}
        />
      ) : (
        <AiOutlineHeart className="f-icon" onClick={handleLiked} />
      )}
      <span>
        {data?.length} {!titleURL && "likes"}
      </span>
    </li>
  );
};

export default Like;
