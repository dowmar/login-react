import useAuth from '../hooks/useAuth';
import { Alert, Button } from 'flowbite-react';
import { useEffect, useRef, useState } from "react";
import axios from '../api/axios';
import { faCheck, faTimes, faInfoCircle, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HiInformationCircle } from "react-icons/hi";

const EDIT_URL = '/profile/edit-password'
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePassword = () => {
    const { auth } = useAuth();
    const errRef = useRef();
    const email = auth.user_email;

    const [oldPwd, setOldPwd] = useState('');
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [showPwd, setShowPwd] = useState(false);

    const [okMsg, setOkMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(EDIT_URL,
                JSON.stringify({ email, old_pwd: oldPwd, new_pwd: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true
                }
            );
            setOldPwd('');
            setPwd('');
            setMatchPwd('');
            console.log(response);
            // navigate(0);
            setErrMsg("password updated");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message || "Missing Input");
            } else if (err.response?.status === 401) {
                console.log(err.response);
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    const handleDismiss = () => {
        setShowAlert(false);
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <main className="w-full max-w-4xl px-6 py-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-144 md:h-288">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/011/345/120/original/young-man-busy-with-many-hands-work-3d-character-illustration-png.png"
                            className="h-full w-full object-cover"
                            alt="Profile"
                        />
                    </div>
                    <div className="flex border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-144 md:h-288">
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change your password
                            </h2>
                            {showAlert && (
                                <Alert
                                    ref={errRef}
                                    color="failure"
                                    icon={HiInformationCircle}
                                    onDismiss={handleDismiss}
                                    rounded
                                    className={`${errMsg ? "block" : "hidden"} my-2 p-2`}
                                >
                                    <span className="font-medium">{errMsg}</span>
                                </Alert>
                            )}
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="oldpwd"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your Old Password
                                    </label>
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        name="oldpwd"
                                        id="oldpwd"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autoComplete='off'
                                        onChange={(e) => setOldPwd(e.target.value)}
                                        value={oldPwd}
                                    />
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        New Password
                                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500 ml-2" : "hidden"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red-500 ml-2"} />
                                    </label>
                                    <input
                                        type={showPwd ? "text" : "password"}
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
                                <div className="relative">
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
                                        type={showPwd ? "text" : "password"}
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
                                    <div className="flex items-start mt-3">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" onClick={() => setShowPwd(!showPwd)} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    gradientDuoTone="purpleToPink"
                                    className="w-full"
                                    type="submit"
                                >
                                    Confirm
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default ChangePassword;
