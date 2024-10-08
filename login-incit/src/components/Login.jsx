import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import axios from '../api/axios';
import useInput from '../hooks/useInput.jsx';
import useToggle from '../hooks/useToggle.jsx';
import logo from '../assets/logo-birb.png';
import { Alert, Button } from 'flowbite-react';
import { ImFacebook2 } from "react-icons/im";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { HiInformationCircle } from "react-icons/hi";

const LOGIN_URL = '/auth';
const LOGIN_SOCIAL_URL = '/auth/social';

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, reset, attributeObj] = useInput('email', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd, login_type: "email_auth" }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const user_email = response?.data?.email;
            const name = response?.data?.name;
            const verify_status = response?.data?.verify_status;
            const login_type = response?.data?.login_type;
            const emailToken = response?.data?.emailToken;
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

            reset();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.message || 'Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleFacebookCallback = async (account) => {
        try {
            if (account?.status === "unknown") {
                throw new Error('Sorry!', 'Something went wrong with Facebook login.');
            }
            const results = await axios.post(LOGIN_SOCIAL_URL,
                JSON.stringify({
                    user: account.name,
                    pwd: '',
                    email: account.email,
                    login_type: "meta_auth",
                    img: account.picture.url
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
                pwd,
                roles,
                accessToken,
                name,
                verify_status,
                login_type,
                emailToken
            });

            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrMsg('Email Already Registered');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    };

    const handleDismiss = () => {
        setShowAlert(false);
    };



    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-20 h-20 mr-1" src={logo} alt="logo" />
                    The App
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {showAlert && (
                            <div ref={errRef}>
                                <Alert
                                    color="failure"
                                    icon={HiInformationCircle}
                                    onDismiss={handleDismiss}
                                    rounded
                                    className={`${errMsg ? "block" : "hidden"} my-2 p-2`}
                                >
                                    <span className="font-medium">{errMsg}</span>
                                </Alert>
                            </div>
                        )}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    {...attributeObj}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>

                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd || ''}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className='persistCheck'>
                                <input type="checkbox"
                                    id='persist'
                                    onChange={toggleCheck}
                                    checked={check}
                                    className='mr-2'
                                />
                                <label htmlFor="persist" className='text-sm font-light text-gray-500 dark:text-gray-400'>Trust This Device</label>
                            </div>
                            <Button

                                gradientDuoTone="purpleToPink"
                                className="w-full"
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <div className="grid justify-items-center">
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Or Login with :</p>
                            </div>
                            <div className="flex space-x-1">
                                <FacebookLogin
                                    appId="3780468242231803"  // Your Facebook App ID
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={handleFacebookCallback}
                                    render={(renderProps) => (
                                        <Button onClick={renderProps.onClick} color="light" className="w-1/2"><ImFacebook2 className="mr-2 h-5 w-5" />Facebook</Button>
                                    )}
                                />

                                <GoogleOAuthProvider clientId="459717985549-ei6f7tsenkqn6s70vec363n84ggd2ph2.apps.googleusercontent.com">
                                    <GoogleLogin
                                        login_url="http://localhost:5000/api/auth/social"
                                    />
                                </GoogleOAuthProvider>

                            </div>

                        </form>
                        <div className='flex'>
                            <p className="text-m font-light text-gray-500 dark:text-gray-400">
                                Need an Account?
                                <span className="line ml-2">
                                    <Link to="/register">Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Login
