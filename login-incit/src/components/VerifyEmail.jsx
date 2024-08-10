import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../api/axios";
import logo from '../assets/logo-birb.png';


const VERIFY_URL = '/register/verify-email';

const VerifyEmail = () => {
    // const { emailToken } = useParams();

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";
    const params = new URLSearchParams(location.search);
    const emailToken = params.get("emailToken");

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(VERIFY_URL,
                JSON.stringify({ emailToken }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response);
            setMessage("Email verified successfully!");
            // setTimeout(() => {
            //     navigate(from, { replace: true });
            // }, 3000);
        } catch (err) {
            setMessage(
                err.response?.data?.message || "Verification failed. Please try again."
            );
        }
    }

    // useEffect(() => {
    //     const verifyEmailToken = async () => {
    //         try {
    //             const response = await axios.post("/register/verify-email", JSON.stringify({ emailToken }),
    //                 {
    //                     headers: { 'Content-Type': 'application/json' },
    //                 });
    //             console.log(response);
    //             setMessage("Email verified successfully!");
    //             setTimeout(() => {
    //                 navigate(from, { replace: true });
    //             }, 3000);
    //         } catch (error) {
    //             setMessage(
    //                 error.response?.data?.message || "Verification failed. Please try again."
    //             );
    //         }
    //     };

    //     if (emailToken) {
    //         verifyEmailToken();
    //     }
    // }, [emailToken, history]);


    return (

        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-20 h-20 mr-1" src={logo} alt="logo" />
                    The App
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Verify Email
                        </h1>

                        <Alert
                            // additionalContent={<ExampleAdditionalContent />}
                            color="success"
                            icon={HiInformationCircle}
                            onDismiss={() => alert('Alert dismissed!')}
                            rounded
                        >
                            <span className="font-medium">Info alert!</span> {message}
                        </Alert>

                        <form className="space-y-4 md:space-y-6" >
                            <Button

                                gradientDuoTone="purpleToPink"
                                className="w-full"
                                onClick={console.log(emailToken)}
                            >
                                Resend Verification
                            </Button>
                            <Button

                                gradientDuoTone="purpleToPink"
                                className="w-full"
                                onClick={handleConfirm}
                            >
                                Confirm Verify Email
                            </Button>

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

export default VerifyEmail
