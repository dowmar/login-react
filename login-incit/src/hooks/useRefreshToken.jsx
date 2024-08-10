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
      // console.log("access Token", response.data);
      console.log("new auth", response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const user_email = response?.data?.email;
      const name = response?.data?.name;
      const verify_status = response?.data?.verify_status;
      const login_type = response?.data?.login_type;
      return { ...prev, roles, accessToken, name, verify_status, login_type, user_email };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
