'use client'

import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, useEffect } from 'react';

const Login: NextPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        let user = undefined;
        axios.get("http://api.mykid.lc/api/user")
            .then(response => {
                user = response.data.name;
                console.log(response.data);
                router.push('/dashboard');
            })
            .catch(err => {
                const axiosError = err as AxiosError;
                console.log(axiosError.code);
                console.log(axiosError.cause);
                console.log(axiosError.message);
            })
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            axios.defaults.withXSRFToken = true;
            axios.defaults.withCredentials = true;

            await axios.get("http://api.mykid.lc/sanctum/csrf-cookie", {
                headers: {
                    Accept: "application/json"
                }
            });

            console.log('Email:', email, 'Password:', password);

            axios.post("http://api.mykid.lc/api/login", {
                email: email,
                password: password
            }).then(response => {
                console.log(response);
                router.push("/dashboard");
            }).catch(err => {
                const axiosError = err as AxiosError;
                console.log(axiosError.code);
                console.log(axiosError.cause);
                console.log(axiosError.message);
            });
        } catch (err) {
            const axiosError = err as AxiosError;
            console.log(axiosError.code);
            console.log(axiosError.cause);
            console.log(axiosError.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

