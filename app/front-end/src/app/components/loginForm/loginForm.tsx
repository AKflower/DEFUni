"use client"

import styles from './loginForm.module.scss'
import Input from '../input/input'
import Button from '../button/button'
import fonts from '../../../../public/fonts/fonts'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Home from '../../home/home';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:3333/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) return response.json();// console.log('Đăng nhập thành công'); 
            else console.log('Đăng nhập không thành công');
        })
        .catch(error => {
            console.error(error);
        })
        .then(data => {
            localStorage.setItem('accessToken', data.access_token);
            router.push('./home');
        })
        .catch(error => { throw new Error("Cannot get access token." + error); });
    };

    return (
        <div className={styles.container+' '+fonts.poppins.className}>
            <h1 className={styles.header}>Login to your account</h1>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <Input label='Email' placeholder='Enter your email' value={email} onChange={handleEmailChange} />
                <Input label='Password' placeholder='Enter your password' value={password} onChange={handlePasswordChange} />
                <Button buttonName='Login now' type="submit" />
            </form>
        </div>
    );
}