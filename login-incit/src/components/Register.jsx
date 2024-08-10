import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Button } from "flowbite-react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import logo from '../assets/logo-birb.png';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        let login_type = 'email_auth';
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, email, login_type, img: '' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    const handleFacebookCallback = async (account) => {
        try {
            if (account?.status === "unknown") {
                throw new Error('Sorry!', 'Something went wrong with Facebook login.');
            }
            const results = await axios.post(REGISTER_URL,
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
            console.log(account);
            console.log(results);
        } catch (error) {
            return error
        }
    };

    // const login = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         try {
    //             // Use the tokenResponse to get user info
    //             const userInfo = await axios.get(
    //                 "https://www.googleapis.com/oauth2/v3/userinfo",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${tokenResponse.access_token}`,
    //                     },
    //                 }
    //             );
    //             console.log(userInfo.data); // Handle the user info here
    //         } catch (error) {
    //             console.error("Failed to fetch user info:", error);
    //         }
    //     },
    //     onError: () => {
    //         console.log("Login Failed");
    //     },
    // });
    // const login = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         console.log(tokenResponse);
    //         // Handle the login success, possibly fetch user info here
    //     },
    //     onError: () => {
    //         console.log("Login Failed");
    //     },
    // });


    return (
        <>
            {success ? (
                <section className="text-center">
                    <h1 className="text-2xl font-bold">Success!</h1>
                    <p>
                        <a href="#" className="text-blue-600 hover:underline">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-20 h-20 mr-1" src={logo} alt="logo" />
                            The App
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <p ref={errRef} className={`my-2 p-2 text-red-600 ${errMsg ? "block" : "hidden"}`} aria-live="assertive">{errMsg}</p>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your Name
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className={validName ? "text-green-500 ml-2" : "hidden"}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className={validName || !user ? "hidden" : "text-red-500 ml-2"}
                                            />
                                        </label>

                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Me"
                                            required
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                        <p
                                            id="uidnote"
                                            className={`mt-2 text-sm text-gray-500 dark:text-gray-300 ${userFocus && user && !validName ? "block" : "hidden"}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="mr-2"
                                                color="crimson"
                                            />
                                            4 to 24 characters.<br />
                                            Must begin with a letter.<br />
                                            Letters, numbers, underscores, hyphens allowed.
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your Email
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className={validEmail ? "text-green-500 ml-2" : "hidden"}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className={validEmail || !email ? "hidden" : "text-red-500 ml-2"}
                                            />
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                            required
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="emailnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />
                                        <p
                                            id="emailnote"
                                            className={`mt-2 text-sm text-gray-500 dark:text-gray-300 ${emailFocus && email && !validEmail ? "block" : "hidden"}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="mr-2"
                                                color="crimson"
                                            />
                                            The email couldn&apos;t start or finish with a dot.<br />
                                            The email shouldn&apos;t contain special chars.<br />
                                            The email could contain a double domain.
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500 ml-2" : "hidden"} />
                                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red-500 ml-2"} />
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p
                                            id="pwdnote"
                                            className={`mt-2 text-sm text-gray-500 dark:text-gray-300 ${pwdFocus && !validPwd ? "block" : "hidden"}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="mr-2"
                                                color="crimson"
                                            />
                                            At least 8 characters.<br />
                                            Must include uppercase and lowercase letters, a number, and a special character.<br />
                                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="confirm_pwd"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Confirm password
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className={validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className={validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"}
                                            />
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm_pwd"
                                            id="confirm_pwd"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <p
                                            id="confirmnote"
                                            className={`mt-2 text-sm text-gray-500 dark:text-gray-300 ${matchFocus && !validMatch ? "block" : "hidden"}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="mr-2"
                                                color="crimson"
                                            />
                                            Must match the first password input field.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>

                                    <Button
                                        disabled={!validName || !validPwd || !validMatch}
                                        gradientDuoTone="purpleToPink"
                                        className="w-full"
                                        onClick={handleSubmit}
                                    >
                                        Create Account
                                    </Button>
                                    <div className="grid justify-items-center">
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Or Sign up with :</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <FacebookLogin
                                            appId=""  // Your Facebook App ID
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={handleFacebookCallback}
                                            render={(renderProps) => (
                                                <Button onClick={renderProps.onClick} color="light" className="w-1/2"><ImFacebook2 className="mr-2 h-5 w-5" />Facebook</Button>
                                            )}
                                        />
                                        <GoogleOAuthProvider clientId="">
                                            <GoogleLogin />
                                        </GoogleOAuthProvider>

                                    </div>
                                    <div className='flex'>
                                        <p className="text-m font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?
                                            <span className="line ml-2">
                                                <Link to="/login">Login</Link>
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Register
