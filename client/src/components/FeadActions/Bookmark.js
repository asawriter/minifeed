import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddBookmark,
  GetFeedsBookmark,
  RemoveBookmark,
} from "../../services/fetch";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

const Bookmark = ({ feedId, userId }) => {
  const queryClient = useQueryClient();

  // GET BOOKMARK OF EVERY FEED
  const { isLoading, data, error } = GetFeedsBookmark("bookmarks", feedId);

  const mutaionBookmarked = useMutation(
    (bookmarked) => {
      if (bookmarked) return RemoveBookmark(userId, feedId);
      return AddBookmark(userId, feedId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmarks"]);
      },
    }
  );

  const handleBookmarked = () => {
    mutaionBookmarked.mutate(data?.includes(userId));
  };

  return (
    <li className="actionSaved">
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Somthing went wrong</p>
      ) : data?.includes(userId) ? (
        <RxBookmarkFilled
          className="f-icon"
          onClick={handleBookmarked}
          style={{ color: "goldenrod" }}
        />
      ) : (
        <RxBookmark className="f-icon" onClick={handleBookmarked} />
      )}
      <span>{data?.length}</span>
    </li>
  );
};

export default Bookmark;
