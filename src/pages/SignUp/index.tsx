import React, { useState } from 'react';
import { SignUpForm } from '../../components';

const SignUp = () => {
    const [userConfirmed, setUserConfirmed] = useState<boolean>(false);

    return <SignUpForm setUserConfirmed={setUserConfirmed} />;
};

export default SignUp;
