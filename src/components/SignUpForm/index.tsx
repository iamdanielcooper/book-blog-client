import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FORM_STATUS } from './enum';

const SignUpForm = ({ formStatus, setFormStatus, setFormData }: any) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formIsComplete()) {
            setFormData({
                username: username,
                password: password,
                email: email,
                isAdmin: false,
            });
            setFormStatus(FORM_STATUS.SENDING);
        } else {
            setFormStatus(FORM_STATUS.AWAITING_USER_INPUT);
            setErrorMessage('Form is incomplete');
        }
    };

    return (
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
            <p data-testid='errorMessage'>{errorMessage}</p>
            <Link to={'/login'}>Already have an account? Log in here.</Link>
            <button>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
