import makeRequest from "../makeRequest";

// REQUEST LOGIN
export const IsLogin = (data, setCurrentUser, successMessage) => {
  try {
    return makeRequest.post("/auth/login", data).then((res) => {
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
      successMessage(res.data.message);
    });
  } catch (error) {
    console.log(error);
  }
};

// REQUEST REGISTER
export const IsRegister = (data, successMessage) => {
  try {
    return makeRequest.post("/auth/register", data).then((res) => {
      res.status === 200 && successMessage(res.data.message);
    });
  } catch (error) {
    console.log(error);
  }
};
