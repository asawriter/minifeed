import { GetComments } from "../../services/fetch";
import Comment from "../Comment";

const ListComment = ({ feedId }) => {
  const { isLoading, data, error } = GetComments("comments", feedId);

  const rootComments = data?.filter((c) => !c.parentId);

  return (
    <div className="listComments">
      {isLoading ? (
        <p>loading ...</p>
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        rootComments.length > 0 &&
        rootComments.map((c) => {
          return <Comment key={c.commentId} comment={c} data={data} />;
        })
      )}
    </div>
  );
};

export default ListComment;
