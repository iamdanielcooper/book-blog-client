import React from 'react';

const SignUpForm = () => {
    return (
        <form>
            <h1>Sign Up</h1>
            <h2>Create an account</h2>
            <input placeholder='Username' />
            <input placeholder='Email' />
            <input placeholder='Password' />
            <input placeholder='Confirm Password' />
            <input placeholder='Confirm Password' />
            <label>
                I have read and agree to the terms and conditions.
                <input type='checkbox' />
            </label>
            <p>Error Message</p>
            <a href='http://example.com'>Already have an account? Log in here.</a>
            <button>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
