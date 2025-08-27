import axios from "axios";

const useAxiosPublic = () => {
  const token = localStorage.getItem("accessToken") || "";
  const instance = axios.create({
    baseURL: "https://a12-blood-bridge-server.vercel.app",
    headers: {
      "Content-Type": "application/json",
      // or your production URL
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return instance;
};

export default useAxiosPublic;
