import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import SignUpForm from '.';
import { BrowserRouter } from 'react-router-dom';

const setup = async () => {
    const utils = render(
        <SignUpForm
            formStatus={() => {}}
            setFormStatus={() => {}}
            setFormData={() => {}}
        />,
        { wrapper: BrowserRouter }
    );

    const username: HTMLInputElement = screen.getByPlaceholderText('Username');
    const email: HTMLInputElement = screen.getByPlaceholderText('Email');
    const password: HTMLInputElement = screen.getByPlaceholderText('Password');
    const confirmedPassword: HTMLInputElement =
        screen.getByPlaceholderText('Confirm Password');
    const checkbox: HTMLLabelElement = await screen.findByLabelText(
        'I have read and agree to the terms and conditions.'
    );
    const errorMessage: HTMLParagraphElement =
        screen.getByTestId('errorMessage');
    const submitButton: HTMLButtonElement = screen.getByRole('button');

    return {
        username,
        email,
        password,
        confirmedPassword,
        checkbox,
        errorMessage,
        submitButton,
        ...utils,
    };
};

test('all input fields are present', async () => {
    const {
        username,
        email,
        password,
        confirmedPassword,
        checkbox,
        submitButton,
    } = await setup();

    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmedPassword).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('if all fields are empty an error message is displayed', async () => {
    const {
        username,
        email,
        password,
        confirmedPassword,
        checkbox,
        errorMessage,
        submitButton,
    } = await setup();

    expect(username.value).toBe('');
    expect(email.value).toBe('');
    expect(password.value).toBe('');
    expect(confirmedPassword.value).toBe('');
    expect(checkbox).not.toBeChecked();
    expect(errorMessage.textContent).toBe('');

    act(() => {
        submitButton.click();
    });

    expect(username).toBeInTheDocument();
    expect(errorMessage.textContent).toBe('Form is incomplete');
});

test('if terms and conditions has not been clicked but all other fields are populated an error message is displayed', async () => {
    const {
        username,
        email,
        password,
        confirmedPassword,
        checkbox,
        errorMessage,
        submitButton,
    } = await setup();

    fireEvent.change(username, { target: { value: 'newusername' } });
    fireEvent.change(email, { target: { value: 'myemail@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });
    fireEvent.change(confirmedPassword, { target: { value: 'password123' } });

    expect(username.value).toBe('newusername');
    expect(email.value).toBe('myemail@example.com');
    expect(password.value).toBe('password123');
    expect(confirmedPassword.value).toBe('password123');
    expect(checkbox).not.toBeChecked();

    expect(errorMessage.textContent).toBe('');

    act(() => {
        submitButton.click();
    });

    expect(username).toBeInTheDocument();
    expect(errorMessage.textContent).toBe('Form is incomplete');
});

test('if password and confirmed password do not match an error message is displayed', async () => {
    const {
        username,
        email,
        password,
        confirmedPassword,
        checkbox,
        errorMessage,
        submitButton,
    } = await setup();

    fireEvent.change(username, { target: { value: 'newusername' } });
    fireEvent.change(email, { target: { value: 'myemail@example.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });
    fireEvent.change(confirmedPassword, { target: { value: 'idontmatch' } });

    expect(username.value).toBe('newusername');
    expect(email.value).toBe('myemail@example.com');
    expect(password.value).toBe('password123');
    expect(confirmedPassword.value).toBe('idontmatch');
    expect(checkbox).not.toBeChecked();

    expect(errorMessage.textContent).toBe('');

    act(() => {
        submitButton.click();
    });

    expect(username).toBeInTheDocument();
    expect(errorMessage.textContent).toBe('Form is incomplete');
});
