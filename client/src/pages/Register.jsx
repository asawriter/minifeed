import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../services/makeRequest";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await makeRequest
      .post("/auth/register", { username, email, password })
      .then((res) => {
        navigate("/login");
      });
  };

  return (
    <div className="register">
      <div className="container">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="btns">
            <button onClick={handleRegister}>Register</button>
            <Link to="/login" className="link">
              <button>Login</button>
            </Link>

            <button>Login with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
