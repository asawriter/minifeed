import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {VscComment} from "react-icons/vsc"
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const LikeComment = ({feedId, cms}) => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient()

  const { isLoading, data, error } = useQuery(["likes"], () => 
    makeRequest.get(`/likes/${feedId}`).then((res) => res.data.likes));

  const mutation = useMutation(
    (newLiked) => {
      if (newLiked) {
        return makeRequest.post(`/likes/${feedId}`, { userLiked: currentUser.userId});
      }
      return makeRequest.post("/likes", { userLiked: currentUser.userId, feedLiked: feedId});
    },
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
        )}
        {" "}likes
      </p>
      <p>
        <VscComment style={{ fontSize: "18px", cursor: "pointer" }} />
        {cms?.length} comments
      </p>
    </div>
  );
};

export default LikeComment;
