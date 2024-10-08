import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import logo from '../assets/logo-birb.png';


const VERIFY_URL = '/register/verify-email';

const VerifyEmail = () => {
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";
    const params = new URLSearchParams(location.search);
    const emailToken = params.get("emailToken");
    const [errMsg, setErrMsg] = useState('');
    const [showAlert, setShowAlert] = useState(true);

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(VERIFY_URL,
                JSON.stringify({ emailToken }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
            setErrMsg("Email verified successfully!");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 3000);
        } catch (err) {
            setErrMsg(
                err.response?.data?.message || "Verification failed. Please try again."
            );
        }
    }

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
                            <Alert
                                ref={errRef}
                                color="success"
                                icon={HiInformationCircle}
                                onDismiss={handleDismiss}
                                rounded
                                className={`${errMsg ? "block" : "hidden"} my-2 p-2`}
                            >
                                <span className="font-medium">{errMsg}</span>
                            </Alert>
                        )}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Verify Email
                        </h1>

                        <form className="space-y-4 md:space-y-6" >
                            <Button

                                gradientDuoTone="purpleToPink"
                                className="w-full"
                                onClick={handleConfirm}
                            >
                                Confirm Verify Email
                            </Button>

                        </form>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default VerifyEmail
