import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from '.';

test('checkbox is present', async () => {
    render(<SignUp />);
    const checkbox = await screen.findByLabelText('I have read and agree to the terms and conditions.');
    expect(checkbox).toBeInTheDocument();
});

test('checkbox is unchecked when component is loaded', async () => {
    render(<SignUp />);
    const checkbox = await screen.findByLabelText('I have read and agree to the terms and conditions.');
    expect(checkbox).not.toBeChecked();
});

test('clicking the checkbox', async () => {
    render(<SignUp />);
    const checkbox = await screen.findByLabelText('I have read and agree to the terms and conditions.');
    checkbox.click();
    expect(checkbox).toBeChecked();
});

test('Clicking the checkbox label toggles the checkbox value', async () => {
    render(<SignUp />);
    const checkbox = await screen.findByLabelText('I have read and agree to the terms and conditions.');
    const checkboxLabel = screen.getAllByText('I have read and agree to the terms and conditions.')[0];

    expect(checkbox).not.toBeChecked();
    checkboxLabel.click();
    expect(checkbox).toBeChecked();
});
