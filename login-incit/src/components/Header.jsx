// import React from 'react'
import { DarkThemeToggle, Avatar, Dropdown } from "flowbite-react"
import logo from '../assets/logo-birb.png';
import useLogout from "../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const Header = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    return (
        <header className="z-50">
            <nav className="bg-white border-gray-200 px-2 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center">
                    <a href="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The App</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a onClick={console.log(auth)} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Documentation</a>
                        <DarkThemeToggle className="mr-2" />
                        {!auth?.roles ? <div></div> :
                            <Dropdown
                                label={
                                    <Avatar alt="User settings" placeholder rounded className="mr-4">
                                        {/* <div className="space-y-1 font-medium dark:text-white mr-2">
                                            <div>{auth?.name}</div>
                                        </div> */}
                                    </Avatar>
                                }
                                arrowIcon={false}
                                inline
                            >

                                <Dropdown.Header>
                                    <span className="block text-sm">{auth?.name}</span>
                                    <span className="block truncate text-sm font-medium">{auth.user_email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item><Link to="/profile">Edit Profile</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
