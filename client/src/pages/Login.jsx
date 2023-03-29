import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IsLogin } from "../services/fetch";

const Login = () => {
  const { setCurrentUser, successMessage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await IsLogin({email, password}, setCurrentUser, successMessage);
    navigate("/")
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
