const FeedContent = ({ title, content, titleURL }) => {
  return (
    <div className="content">
      <h1>{title}</h1>
      <p>
        {!titleURL && content.length > 220
          ? `${content.slice(0, 222)}...`
          : content}{" "}
        <span>{!titleURL && content.length > 220 && "See more"}</span>
      </p>
    </div>
  );
};

export default FeedContent;
