// pages/login.js
"use client"
import { useState } from 'react';
import styles from "./login.module.css"
import Image from 'next/image'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordEyeClicked, setPasswordEyeClicked] = useState(false);
    const [confirmPasswordEyeClicked, setConfirmPasswordEyeClicked] = useState(false);
    const [passwordError, setPasswordError] = useState('Passwords Do Not Match!');
    const confirmPasswordOpacityOpen = confirmPasswordEyeClicked ? 0 : 1;
    const confirmPasswordOpacityClosed = confirmPasswordEyeClicked ? 1 : 0;

    const passwordOpacityOpen = passwordEyeClicked ? 0 : 1;
    const passwordOpacityOpenClosed = passwordEyeClicked ? 1 : 0;

    const passwordType = passwordEyeClicked ? 'text' : 'password';
    const confirmPasswordType = confirmPasswordEyeClicked ? 'text' : 'password';


    const onSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            // Handle successful login here
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };


    return (
        <form onSubmit={onSubmit} className={styles.loginForm}>
            <div className={styles.formLabelAndInput}>
                <label className={styles.formLabel} htmlFor="password">Username</label>
                <input
                    id="username"
                    name="username"
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.formLabelAndInputPassword}>
                <label className={styles.formLabel} htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    placeholder='Password'
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.eyesDivPassword}>
                    <Image
                    width={14}
                    height={13}
                    alt='eyeOpen' onClick={() => setPasswordEyeClicked(!passwordEyeClicked)} className={styles.openEye} src='/eye1.png' style={{ opacity: passwordOpacityOpen }} />
                    <Image
                    width={14}
                    height={13}
                    alt='eyeClose' onClick={() => setPasswordEyeClicked(!passwordEyeClicked)} className={styles.openEye} src='/eye2.png' style={{ opacity: passwordOpacityOpenClosed }} />
                </div>
            </div>
            <div className={styles.formLabelAndInputConfirmPassword}>
                <label className={styles.formLabel} htmlFor="confirmpassword">Confirm Password</label>
                <input
                    id="confirmpassword"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    type={confirmPasswordType}
                />
                <div className={styles.eyesDivConfirmPassword}>
                    <Image
                    width={14}
                    height={13}
                    alt='eyeOpen' onClick={() => setConfirmPasswordEyeClicked(!confirmPasswordEyeClicked)} className={styles.openEye} src='/eye1.png' style={{ opacity: confirmPasswordOpacityOpen }} />
                    <Image
                    width={14}
                    height={13}
                    alt='eyeClose' onClick={() => setConfirmPasswordEyeClicked(!confirmPasswordEyeClicked)} className={styles.openEye} src='/eye2.png' style={{ opacity: confirmPasswordOpacityClosed }} />
                </div>
            </div>
            <button className={styles.formSubmitButton} type="submit">Submit</button>
        </form>
    );
}
