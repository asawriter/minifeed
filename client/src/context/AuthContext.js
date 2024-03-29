import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(currentUser));
  }, [currentUser]);

  const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const successMessage = (message) => toast.success(message, options);

  const errorMessage = (message) => toast.error(message, options);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, successMessage, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
