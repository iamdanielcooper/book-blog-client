import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FORM_STATUSES } from './enum';
const endpoint = 'http://localhost:4000/users/register';

const SignUpForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
    const [formComplete, setFormComplete] = useState<boolean>(false);
    const [formStatus, setFormStatus] = useState<string>(
        FORM_STATUSES.AWAITING_USER_INPUT
    );
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<AxiosResponse>();

    useEffect(() => {
        const sendUser = async () => {
            const response: AxiosResponse = await axios.post(endpoint, {
                username: username,
                password: password,
                email: email,
                isAdmin: false,
            });
            setServerResponse(response);
        };
        if (formStatus === FORM_STATUSES.SENDING) {
            sendUser();
        }
    }, [formStatus]);

    useEffect(() => {
        const allFieldsPopulated =
            password.length > 0 &&
            password === confirmedPassword &&
            username.length > 0 &&
            email.length > 0 &&
            termsAgreed;

        setFormComplete(allFieldsPopulated);
    }, [confirmedPassword, password, username, email, termsAgreed]);

    useEffect(() => {
        switch (serverResponse?.status) {
            case 201:
                alert('All good mate');
                break;
        }
    }, [serverResponse]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formComplete) {
            setFormStatus(FORM_STATUSES.SENDING);
        } else {
            setFormStatus(FORM_STATUSES.ERROR);
            setErrorMessage('Form is not complete');
        }
    };

    return (
        <>
            {formStatus === FORM_STATUSES.SENDING ? (
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
