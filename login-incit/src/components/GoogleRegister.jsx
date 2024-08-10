import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import useAuth from '../hooks/useAuth.jsx';
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const GoogleRegister = ({ sourcelink }) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleCallback = async (account) => {
        try {
            const email = account.email;
            const username = account.name;
            const img = account.picture;
            if (!account.sub) {
                throw new Error('Sorry!', 'Something went wrong with Google login.');
            }
            const results = await axios.post("http://localhost:5000/api/register/social",
                JSON.stringify({
                    user: username,
                    pwd: '',
                    email: email,
                    login_type: "google_auth",
                    img: img
                }),
                {
                    headers: { 'Content-Type': 'application/json' },

                }
            );
            const accessToken = results?.data?.accessToken;
            const roles = results?.data?.roles;
            const user_email = results?.data?.email;
            const name = results?.data?.name;
            const verify_status = results?.data?.verify_status;
            const login_type = results?.data?.login_type;
            const emailToken = results?.data?.emailToken;
            setAuth({
                user_email,
                pwd: "",
                roles,
                accessToken,
                name,
                verify_status,
                login_type,
                emailToken
            });

            navigate(from, { replace: true });
        } catch (error) {
            return error
        }
    };
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Use the tokenResponse to get user info
                const userInfo = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );
                const results = await handleGoogleCallback(userInfo.data, tokenResponse.access_token);
                console.log('google info', userInfo.data);
                // console.log('google login', results);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        },
        onError: () => {
            console.log("Login Failed");
        },
    });

    return (

        <Button
            color="light"
            className="w-1/2"
            onClick={() => login()}
        >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
        </Button>

    );
}

export default GoogleRegister