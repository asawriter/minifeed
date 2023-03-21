import axios from "axios";

const makeRequest = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export default makeRequest;
