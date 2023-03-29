const FeedContent = ({title, content}) => {
  return (
    <div className="content">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default FeedContent;
