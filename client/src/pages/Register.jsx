import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {AuthContext} from "../context/AuthContext"
import { IsRegister } from "../services/fetch";

const Register = () => {
  const {successMessage} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await IsRegister({name, email, password}, successMessage)
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="container">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
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
