import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../services/makeRequest";

const Login = () => {
  const { setCurrentUser, successMessage } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await makeRequest
      .post("/auth/login", { username, password })
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(res.data.user);
        }
        successMessage(res.data.message);
        navigate("/");
      });
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="btns">
            <button onClick={handleLogin}>Login</button>
            <Link to="/register" className="link">
              <button>Register</button>
            </Link>

            <button>Login with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
