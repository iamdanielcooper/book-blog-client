import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { FORM_KEYS } from './enum';

interface FormData {
    username: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    termsConfirmed: boolean;
}

const SignUpForm = ({ setUserConfirmed }: any) => {
    const [formData, setFormData] = useState<FormData>({
        [FORM_KEYS.USERNAME]: '',
        [FORM_KEYS.EMAIL]: '',
        [FORM_KEYS.PASSWORD]: '',
        [FORM_KEYS.PASSWORD_CONFIRMED]: '',
        [FORM_KEYS.TERMS_CONFIRMED]: false,
    });

    const onChange = (e: { target: HTMLInputElement }, key: String) => {
        setFormData(prevState => {
            switch (key) {
                case FORM_KEYS.USERNAME:
                    return { ...prevState, [FORM_KEYS.USERNAME]: e.target.value };
                case FORM_KEYS.EMAIL:
                    return { ...prevState, [FORM_KEYS.EMAIL]: e.target.value };
                case FORM_KEYS.PASSWORD:
                    return { ...prevState, [FORM_KEYS.PASSWORD]: e.target.value };
                case FORM_KEYS.PASSWORD_CONFIRMED:
                    return { ...prevState, [FORM_KEYS.PASSWORD_CONFIRMED]: e.target.value };
                case FORM_KEYS.TERMS_CONFIRMED:
                    return { ...prevState, [FORM_KEYS.TERMS_CONFIRMED]: e.target.checked };
                default:
                    return prevState;
            }
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(formData);
        // TODO hit the API!
        setUserConfirmed(true);
    };

    return (
        <form data-testid='form' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <h2>Create an account</h2>
            <input
                onChange={e => onChange(e, FORM_KEYS.USERNAME)}
                type='text'
                placeholder='Username'
                value={formData[FORM_KEYS.USERNAME]}
            />
            <input
                onChange={e => onChange(e, FORM_KEYS.EMAIL)}
                type='text'
                placeholder='Email'
                value={formData.email}
            />
            <input
                onChange={e => onChange(e, FORM_KEYS.PASSWORD)}
                type='password'
                placeholder='Password'
                value={formData.password}
            />
            <input
                onChange={e => onChange(e, FORM_KEYS.PASSWORD_CONFIRMED)}
                type='password'
                placeholder='Confirm Password'
                value={formData[FORM_KEYS.PASSWORD_CONFIRMED]}
            />
            <label>
                I have read and agree to the terms and conditions.
                <input
                    onChange={e => onChange(e, FORM_KEYS.TERMS_CONFIRMED)}
                    checked={formData.termsConfirmed}
                    type='checkbox'
                />
            </label>
            <p>Error Message</p>
            <Link to={'/login'}>Already have an account? Log in here.</Link>
            <button>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
