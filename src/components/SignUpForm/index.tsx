import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FORM_STATUS } from './enum';
const endpoint = 'http://localhost:4000/users/register';

const SignUpForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

    const [formStatus, setFormStatus] = useState<string>(
        FORM_STATUS.AWAITING_USER_INPUT
    );
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<AxiosResponse>();

    useEffect(() => {
        // TODO - validate form
        const sendUser = async () => {
            const response: AxiosResponse = await axios.post(endpoint, {
                username: username,
                password: password,
                email: email,
                isAdmin: false,
            });
            setServerResponse(response);
        };
        if (formStatus === FORM_STATUS.SENDING) {
            sendUser();
        }
    }, [formStatus]);

    useEffect(() => {
        switch (serverResponse?.status) {
            case 201:
                alert('All good mate');
                break;
        }
    }, [serverResponse]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormStatus(FORM_STATUS.SENDING);
    };

    return (
        <>
            {formStatus === FORM_STATUS.SENDING ? (
                <h1>Loading</h1>
            ) : (
                <form data-testid='form' onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <h2>Create an account</h2>
                    <input
                        onChange={e => setUsername(e.target.value)}
                        type='text'
                        placeholder='Username'
                        value={username}
                    />
                    <input
                        onChange={e => setEmail(e.target.value)}
                        type='text'
                        placeholder='Email'
                        value={email}
                    />
                    <input
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        value={password}
                    />
                    <input
                        onChange={e => setConfirmedPassword(e.target.value)}
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmedPassword}
                    />
                    <label>
                        I have read and agree to the terms and conditions.
                        <input
                            onChange={e => setTermsAgreed(e.target.checked)}
                            checked={termsAgreed}
                            type='checkbox'
                        />
                    </label>
                    <p>{errorMessage}</p>
                    <Link to={'/login'}>
                        Already have an account? Log in here.
                    </Link>
                    <button>Sign Up</button>
                </form>
            )}
        </>
    );
};

export default SignUpForm;
