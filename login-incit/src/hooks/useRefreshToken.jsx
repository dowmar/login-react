import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("previous state", JSON.stringify(prev));
      console.log("access Token", response.data.accessToken);
      console.log("ROLESS", response.data.roles);
      return { ...prev, roles: response.data.roles, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
