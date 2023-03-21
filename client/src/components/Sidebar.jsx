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

      <div className="center">
        <p>RECENT POST</p>
        <div className="list">
        <div className="item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3CRnT1KSwFkePYHzhcq6rgHaJQ%26pid%3DApi&f=1&ipt=f491e7ee9e208e3132fd38e7080693151f4010c0a7fb9419c2390d5a2f3318e6&ipo=images"
              alt=""
            />
            <div className="post">
              <p>Who was the best drunk/alcolohic character in a TV</p>
              <span>* 1001 comments * 3/1/2023</span>
            </div>
          </div>
          <div className="item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3CRnT1KSwFkePYHzhcq6rgHaJQ%26pid%3DApi&f=1&ipt=f491e7ee9e208e3132fd38e7080693151f4010c0a7fb9419c2390d5a2f3318e6&ipo=images"
              alt=""
            />
            <div className="post">
              <p>Who was the best drunk/alcolohic character in a TV</p>
              <span>* 1001 comments * 3/1/2023</span>
            </div>
          </div>
          <div className="item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3CRnT1KSwFkePYHzhcq6rgHaJQ%26pid%3DApi&f=1&ipt=f491e7ee9e208e3132fd38e7080693151f4010c0a7fb9419c2390d5a2f3318e6&ipo=images"
              alt=""
            />
            <div className="post">
              <p>Who was the best drunk/alcolohic character in a TV</p>
              <span>* 1001 comments * 3/1/2023</span>
            </div>
          </div>
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
