import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { AuthContext } from "../context/AuthContext";
import { AddLiked, GetLikes, RemoveLiked } from "../services/fetch";

const LikeComment = ({ feedId, cms }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // GET LIKES
  const { isLoading, data, error } = GetLikes("likes", feedId);

  // HANDLE LIKES
  const mutation = useMutation(
    async (liked) =>
      liked
        ? await RemoveLiked(feedId, currentUser.userId)
        : await AddLiked(feedId, currentUser.userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLiked = () => {
    mutation.mutate(data?.includes(currentUser.userId));
  };

  return (
    <div className="likecomments">
      <p>
        {!data?.includes(currentUser.userId) ? (
          <AiOutlineHeart
            style={{ fontSize: "18px", cursor: "pointer" }}
            onClick={handleLiked}
          />
        ) : (
          <AiFillHeart
            style={{ fontSize: "18px", cursor: "pointer", color: "red" }}
            onClick={handleLiked}
          />
        )}
        {isLoading ? (
          <p>Loading</p>
        ) : error ? (
          <p>Somethings went wrong.</p>
        ) : (
          data?.length
        )}{" "}
        likes
      </p>
      <p>
        <VscComment style={{ fontSize: "18px", cursor: "pointer" }} />
        {cms?.length} comments
      </p>
    </div>
  );
};

export default LikeComment;
