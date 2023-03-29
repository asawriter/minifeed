import "./styles/index.scss"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import FeedDetails from "./pages/FeedDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import SavedFeeds from "./pages/SavedFeeds";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const PrivateRoute = () => {
    return currentUser?.email ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/feeds/:titleURL/:feedId" element={<FeedDetails />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/create/post" element={<CreatePost />} />
          <Route path="/saved/feeds/:userId" element={<SavedFeeds />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
