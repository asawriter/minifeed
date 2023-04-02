import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <div className="info">
          <img
            src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            alt=""
          />
          <span>Home</span>
        </div>
        
        <p>Your personal MiniFeed frontpage. Come here to check in with your favorite communities.</p>

        <div className="btns">
          <Link to="/create/post" className="link"><button style={{color : "#fff", backgroundColor : "blueviolet"}}>Create Post</button></Link>
          <button style={{color : "blueviolet"}}>Create Community</button>
        </div>
      </div>

      <div className="bottom">
        <div className="child">
          <div className="left">
            <p>User Agreement</p>
            <p>Privacy Policy</p>
          </div>
          <div className="right">
            <p>Content Policy</p>
            <p>Moderator Code Of Conduct</p>
          </div>
        </div>
        <div className="child">
          <div className="left">
            <p>English</p>
            <p>Français</p>
            <p>Italiano</p>
          </div>
          <div className="right">
            <p>Deutsch</p>
            <p>Espanol</p>
            <p>Vietnamese</p>
          </div>
        </div>
        <div className="footer">
          <p>MiniFeed Inc © 2023. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
