import Comment from "../Comment";

const ListComment = ({ isLoading, data, error }) => {

  return (
    <div className="listComments">
      {isLoading ? (
        <p>loading ...</p>
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        data.length > 0 &&
        data.map((c) => {
          return <Comment key={c.commentId} comment={c} />;
        })
      )}
    </div>
  );
};

export default ListComment;
