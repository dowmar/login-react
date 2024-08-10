import { useState, useEffect } from 'react';
import { Card, Pagination, Table } from 'flowbite-react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGS_URL = '/dashboard/logs'
const STATS_URL = '/dashboard/stats'

const UserData = () => {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeSessionsToday, setActiveSessionsToday] = useState(0);
    const [avgActiveSessions7Days, setAvgActiveSessions7Days] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        axios.get(LOGS_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setUsers(response.data);
            });

        axios.get(STATS_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setTotalUsers(response.data.totalUsers);
                setActiveSessionsToday(response.data.activeSessionsToday);
                setAvgActiveSessions7Days(response.data.avgActiveSessions7Days);
            });
    }, [auth.accessToken]);

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const censorEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const censorLength = Math.floor(localPart.length / 2);
        const censoredPart = '*'.repeat(censorLength);
        return `${localPart.slice(0, censorLength)}${censoredPart}@${domain}`;
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className="bg-gray-50 dark:bg-gray-900  flex flex-col items-center justify-center">
            <div className="px-12 mx-auto container align-middle">
                <div className="grid grid-cols-3 gap-4">
                    <Card href="#" className="max-w-sm">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h6 className="text-xl text-gray-700 dark:text-gray-400">Total</h6>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Signed Up Account
                                </p>
                                <h4
                                    className="mt-2 font-bold tracking-tight text-gray-900 dark:text-white text-4xl text-left"
                                >
                                    {totalUsers}
                                </h4>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-left flex flex-row justify-start items-center">
                            <span className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </span>
                            <p className='text-gray-700 dark:text-gray-400'><span className="text-teal-500 font-bold">100%</span></p>
                        </div>
                    </Card>
                    <Card href="#" className="max-w-sm">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h6 className="text-xl text-gray-700 dark:text-gray-400">Active</h6>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Sessions Today
                                </p>
                                <h4 className="mt-2 font-bold tracking-tight text-gray-900 dark:text-white text-4xl text-left"
                                >
                                    {activeSessionsToday}
                                </h4>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-left flex flex-row justify-start items-center">
                            <span className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </span>
                            <p className='text-gray-700 dark:text-gray-400'><span className="text-teal-500 font-bold">100%</span></p>
                        </div>
                    </Card>
                    <Card href="#" className="max-w-sm">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <h6 className="text-xl text-gray-700 dark:text-gray-400">Average</h6>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Active in 7 Days
                                </p>
                                <h4 className="mt-2 font-bold tracking-tight text-gray-900 dark:text-white text-4xl text-left">{avgActiveSessions7Days}</h4>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-left flex flex-row justify-start items-center">
                            <span className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </span>
                            <p className='text-gray-700 dark:text-gray-400'>
                                <span className="text-teal-500 font-bold">100%</span></p>
                        </div>
                    </Card>

                </div>
            </div>
            <div className="mt-5 px-10">
                <Table striped className="mt-5">
                    <Table.Head>
                        <Table.HeadCell className='text-gray-900 dark:text-white text-l'>Email</Table.HeadCell>
                        <Table.HeadCell className='text-gray-900 dark:text-white text-l'>Sign-Up Timestamp</Table.HeadCell>
                        <Table.HeadCell className='text-gray-900 dark:text-white text-l'>Login Count</Table.HeadCell>
                        <Table.HeadCell className='text-gray-900 dark:text-white text-l'>Last Logout</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentUsers.map((user, index) => (
                            <Table.Row key={index}>
                                <Table.Cell className="p-4">{censorEmail(user.email)}</Table.Cell>
                                <Table.Cell className="p-4">{formatTimestamp(user.signUpTimestamp)}</Table.Cell>
                                <Table.Cell className="text-center flex items-center justify-center p-4">{user.loginCount}</Table.Cell>
                                <Table.Cell className="p-6">{user.lastLogout ? formatTimestamp(user.lastLogout) : 'N/A'}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <div className="flex justify-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(users.length / usersPerPage)}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserData;
