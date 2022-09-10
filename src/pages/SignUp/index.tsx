import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { SignUpForm } from '../../components';
import { FORM_STATUS } from '../../components/SignUpForm/enum';
const endpoint = 'http://localhost:4000/users/register';

const SignUp = () => {
    const [formStatus, setFormStatus] = useState<string>(
        FORM_STATUS.AWAITING_USER_INPUT
    );
    const [formData, setFormData] = useState({});
    const [serverResponse, setServerResponse] = useState<AxiosResponse>();

    useEffect(() => {
        const sendUser = async () => {
            try {
                const response: AxiosResponse = await axios.post(
                    endpoint,
                    formData
                );
                console.log(response);

                setServerResponse(response);
            } catch (error) {}
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
                setFormStatus(FORM_STATUS.AWAITING_USER_INPUT);
                break;
        }
    }, [serverResponse]);

    const renderComponent = () => {
        switch (formStatus) {
            case FORM_STATUS.AWAITING_USER_INPUT:
                return (
                    <SignUpForm
                        formStatus={formStatus}
                        setFormStatus={setFormStatus}
                        setFormData={setFormData}
                    />
                );
            case FORM_STATUS.SENDING:
                return <h1>Sending</h1>;
            case FORM_STATUS.SUCCESS:
                return <h1>Sent ✅</h1>;
            default:
                return <h1>Loading</h1>;
        }
    };

    return <>{renderComponent()}</>;
};

export default SignUp;
