import { BsFileEarmarkPostFill } from "react-icons/bs";
import { CiHashtag } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";

const ProfileInfo = () => {
  return (
    <ul>
      <li>
        <BsFileEarmarkPostFill className="icon" />
        <span>147 posts published</span>
      </li>
      <li>
        <VscComment className="icon" />
        <span>21 comments written</span>
      </li>
      <li>
        <CiHashtag className="icon" />
        <span>11 tags followed</span>
      </li>
    </ul>
  );
};

export default ProfileInfo;
