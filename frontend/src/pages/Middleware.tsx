import ServerPrivateApi from "../services/ServerPrivateAPI";
import { isExpired } from "react-jwt";
import { clearToken } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";

export default function Middleware() {
  const user = useSelector((state: RootState) => state.user);

  const effectAsync = async () => {
    ServerPrivateApi.interceptors.request.use(
      (config) => {
        let token = user?.token || null;
        if (!token) {
          token = sessionStorage.getItem("token");
        }
        if (isExpired(token as string)) {
          clearToken();
        }
        config.headers.Authorization = `Bearer ${token}`
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  useEffect(() => {
    effectAsync()
  }, [user.token]);

  return <></>
};

