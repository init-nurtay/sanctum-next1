'use client'

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type DashboardProps = {
}

function Dashboard({ }: DashboardProps) {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;

        axios.get("http://api.mykid.lc/api/user")
            .then(response => {
                setUser(response.data.name);
                console.log(response.data);
            })
            .catch((err) => {
                const axiosError = err as AxiosError;
                console.log(axiosError.code);
                console.log(axiosError.cause);
                console.log(axiosError.message);
                router.push('/login');
            })
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <p>{user}</p>
        </div>
    );
};

export default Dashboard;

