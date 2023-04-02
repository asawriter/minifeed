const FeedImage = ({ image }) => {
  if (image)
    return (
      <div className="imgContainer">
        <img src={"/images/" + image} alt="" />
      </div>
    );
};

export default FeedImage;
