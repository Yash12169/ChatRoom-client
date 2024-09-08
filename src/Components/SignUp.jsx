import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LogInStep1 from "./LogInStep1";
import LogInStep3 from "./LogInStep3";
import LoginStep2 from "./LoginStep2";

function SignUp() {
    const [step,setStep] = useState(1)
    const [userData,setUserData] = useState({})
    const handleStep1Submit  = (data) => {
        setUserData(data)
        setStep(2)
    }
    const handleStep2Submit = (data) => {
        setUserData(data)
        setStep(3)
    }

    return (
        <div className={'page'}>
            <Navbar/>
                {step === 1 && <LogInStep1 onNext={handleStep1Submit} />}
                {step === 2 && <LoginStep2  userData={userData} onNext={handleStep2Submit} />}
                {step === 3 && <LogInStep3 userData={userData} />}

            <Footer/>
        </div>
    );
}

export default SignUp;
