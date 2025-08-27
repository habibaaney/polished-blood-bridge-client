
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const token = user?.accessToken || "";
  const instance = axios.create({
    baseURL: "https://a12-blood-bridge-server.vercel.app",
    headers: {
      "Content-Type": "application/json",
      
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Attach token to every request dynamically
  instance.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        // console.log("📌 Token Attached:", user.accessToken);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxiosSecure;
