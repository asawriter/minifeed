import moment from "moment";
import React from "react";

const UserInfo = ({ createdUser, bio }) => {
  return (
    <ul className="userInfo">
      <li>
        <p>
          {bio?.length > 0
            ? bio
            : `Build On! Would you like to become an AWS Community Builder? Learn
          more about the program and apply to join when applications are open
          next.`}
        </p>
      </li>

      <div className="list">
        <li>
          <b>LOCATION:</b>
          <p>Viet Nam</p>
        </li>
        <li>
          <b>JOINED:</b>
          <p>{moment(createdUser).format("LL")}</p>
        </li>
      </div>
    </ul>
  );
};

export default UserInfo;
