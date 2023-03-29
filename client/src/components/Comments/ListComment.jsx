import { GetComments } from "../../services/fetch/loadComments";
import Comment from "../Comment";

const ListComment = ({ feedId, type }) => {
  const { isLoading, data, error } = GetComments("comments", feedId);

  return (
    <div className="listComments">
      {isLoading ? (
        <p>loading ...</p>
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        data.length > 0 && data.map((c) => <Comment key={c.commentId} comment={c}/>)
      )}
    </div>
  );
};

export default ListComment;
