import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import {
  MdOutlineSettings,
  MdOutlineFeedback,
  MdOutlineLogout,
  MdOutlineAccountCircle,
} from "react-icons/md";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [openOptions, setOpenOptions] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await makeRequest.post("/auth/logout");
    setCurrentUser(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link className="link" to="/">
            <p>MiniFeed.</p>
          </Link>
          <div className="searchContainer">
            <BiSearch style={{ fontSize: "20px", marginRight: "8px" }} />
            <input type="text" placeholder="Search MiniFeed" />
          </div>
        </div>

        <div className="right">
          {currentUser ? (
            <>
              <Link className="link" to="/create/post">
                <p>Create Post</p>
              </Link>
              <div className="account">
                <img
                  onClick={() => setOpenOptions(!openOptions)}
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3CRnT1KSwFkePYHzhcq6rgHaJQ%26pid%3DApi&f=1&ipt=b2e3e988cbb3619756a1e10eae561ba475f74a86fc571e1411577ba7e7af8796&ipo=images"
                  alt=""
                />
                {openOptions && (
                  <ul onClick={() => setOpenOptions(!openOptions)}>
                    <Link
                      to={`/profile/${currentUser.userId}`}
                      className="link"
                    >
                      <li>
                        <MdOutlineAccountCircle className="icon" />
                        <span>{currentUser.username}</span>
                      </li>
                    </Link>
                    <li>
                      <MdOutlineSettings className="icon" />
                      <span>Settings & privacy</span>
                    </li>
                    <li>
                      <MdOutlineFeedback className="icon" />
                      <span>Settings & privacy</span>
                    </li>
                    <li onClick={handleLogout}>
                      <MdOutlineLogout className="icon" />
                      <span>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="link">
                <button>Login</button>
              </Link>
              <Link to="/register" className="link">
                <button
                  style={{ color: "blueviolet", backgroundColor: "#fff" }}
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
