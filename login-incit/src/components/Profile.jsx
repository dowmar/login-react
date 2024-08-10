import React from 'react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { auth } = useAuth();
    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <main className="w-full max-w-4xl px-6 py-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 md:h-144">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/011/345/120/original/young-man-busy-with-many-hands-work-3d-character-illustration-png.png"
                            className="h-full w-full object-cover"
                            alt="Profile"
                        />
                    </div>
                    <div className="flex border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 md:h-144">
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Hi, {auth.name}
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Name</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={auth.name} required="" />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Profile;
