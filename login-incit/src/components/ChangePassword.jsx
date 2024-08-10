import React from 'react'
import logo from "../assets/logo-birb.png"
import useAuth from '../hooks/useAuth';


const ChangePassword = () => {
    const { auth } = useAuth();
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <main className="flex flex-col items-center justify-center px-6 py-8 ">
                {/* <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 mb-4"
                > */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 md:h-144"
                    >
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/011/345/120/original/young-man-busy-with-many-hands-work-3d-character-illustration-png.png"
                            className="h-96 md:h-144 object-cover"
                            alt="Profile"
                        />
                    </div>
                    <div
                        className="flex border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 md:h-144"
                    >
                        <div className="h-48 md:h-72 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Hi, {auth.name}
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </main>
        </section>
    )
}

export default ChangePassword
