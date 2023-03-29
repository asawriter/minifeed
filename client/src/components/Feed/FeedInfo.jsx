import moment from 'moment'
import { Link } from 'react-router-dom'

const FeedInfo = ({avatar, author, name, createdFeed}) => {
  return (
    <div className="info">
          <img src={"/images/" + (avatar || "default_avatar.png")} alt="" />
          <p>
            <Link to={`/profile/${author}`} className="link">
              <span>{name}</span>
            </Link>

            <span style={{ fontSize: "12px" }}>
              {moment(createdFeed).fromNow()}
            </span>
          </p>
        </div>
  )
}

export default FeedInfo