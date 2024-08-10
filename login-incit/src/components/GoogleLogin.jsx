import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react"; // Assuming you're using Flowbite for the Button component
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const REGISTER_URL = 'http://localhost:5000/api/register';

const GoogleLogin = () => {
    const handleGoogleCallback = async (account) => {
        try {
            if (!account.sub) {
                throw new Error('Sorry!', 'Something went wrong with Google login.');
            }
            const results = await axios.post(REGISTER_URL,
                JSON.stringify({
                    user: account.name,
                    pwd: '',
                    email: account.email,
                    login_type: "google_auth",
                    img: account.picture
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(account);
            console.log(results);
            return results;
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
                const results = handleGoogleCallback(userInfo.data);
                console.log(results);
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

export default GoogleLogin
