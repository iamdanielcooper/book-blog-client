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

    const formIsComplete = () => {
        return (
            termsAgreed &&
            confirmedPassword.length > 0 &&
            password.length > 0 &&
            email.length > 0 &&
            username.length > 0 &&
            password === confirmedPassword
        );
    };

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
        if (formStatus === FORM_STATUS.SENDING) {
            sendUser();
        }
    }, [formStatus]);

    useEffect(() => {
        switch (serverResponse?.status) {
            case 201:
                setFormStatus(FORM_STATUS.SUCCESS);
                break;
            default:
                setFormStatus(FORM_STATUS.ERROR);
                setErrorMessage('We should have an error message here');
        }
    }, [serverResponse]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formIsComplete()) {
            setFormStatus(FORM_STATUS.SENDING);
        } else {
            setFormStatus(FORM_STATUS.ERROR);
            setErrorMessage('Form is incomplete');
        }
    };

    const renderComponent = () => {
        switch (formStatus) {
            case FORM_STATUS.AWAITING_USER_INPUT:
                return;
            case FORM_STATUS.SENDING:
                return <h1>Sending</h1>;
            case FORM_STATUS.SUCCESS:
                return <h1>Sent</h1>;
            case FORM_STATUS.ERROR:
                return <h1>Error</h1>;
            default:
                return <h1>Loading</h1>;
        }
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
