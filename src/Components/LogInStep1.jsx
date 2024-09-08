import React, {useEffect, useState} from 'react';
import '../App.css'
import Appname from "../assets/Appname.png";
import {Link} from "react-router-dom";
import axios from "axios";
function LogInStep1({onNext}) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [warningUsername,setWarningUsername] = useState(0)
    const [warningEmail,setWarningEmail] = useState(0)
    const [warningPassword,setWarningPassword] = useState('')
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [availabilityMessageE, setAvailabilityMessageE] = useState('');



    useEffect(() => {
        const checkUsernameAvailability  = async () => {
            try{
                const response = await axios.post('http://localhost:8000/messager/availability/',{ username:username})
                console.log(response.data)
                if(response.data.available){
                    setAvailabilityMessage('yes')
                }
                else{
                    setAvailabilityMessage('no')
                }
            }
            catch (e) {
                setAvailabilityMessage('no')
            }

        };
        if(username.trim() === ''){
            setAvailabilityMessage('')
        }

        if (username.trim() !== '') {
            checkUsernameAvailability();
        }





    }, [username]);


    useEffect(() => {
        const checkEmailAvailability  = async () => {
            try{
                const response = await axios.post('http://localhost:8000/messager/availability-email/',{ email:email})
                console.log(response.data)
                if(response.data.available){
                    setAvailabilityMessageE('yes')
                }
                else{
                    setAvailabilityMessageE('no')
                }
            }
            catch (e) {
                setAvailabilityMessageE('no')
            }

        };
        if(email.trim() === ''){
            setAvailabilityMessageE('')
        }

        if (email.trim() !== '') {
            checkEmailAvailability()
        }


    }, [email]);

    const handleNext  = () => {
        if(username !== '' && password !== '' && email !== '' && availabilityMessage ==='yes' && availabilityMessageE === 'yes')
        {
            setWarningEmail(0)
            setWarningPassword(0)
            setWarningUsername(0)
            onNext({username, password,email})
        }
        else{
            if(email===''){
                setWarningEmail(1)
            }
            if(username === ''){
                setWarningUsername(1)
            }
            if(password === ''){
                setWarningPassword(1)
            }
            if(email !== ''){
                setWarningEmail(0)
            }
            if(password !== ''){
                setWarningPassword(0)
            }
            if(username !== ''){
                setWarningUsername(0)
            }
        }

    }

    return (
        <>
            <div className={'container-signup'}>
                <div className={'appname-signup'}>
                    <img src={Appname}/>
                </div>
                <div className={'signup-des'}>
                    <p>
                        Sign Up to talk to your friends, family members and more
                    </p>
                </div>
                <div className={'fields-signup'}>

                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                           placeholder={'Username'} />
                    {warningUsername === 1 &&
                        (<p className={'warning'}>*Please enter a valid username to continue</p>)
                    }
                    {availabilityMessage === 'yes'&& username.length > 0 && (
                        <div className={'available'}>
                            <p> ☑️ Username available</p>
                        </div>
                    )}
                    {availabilityMessage === 'no' && username.length > 0 && (
                        <div className={'warning warning1'}>
                                                <p> *Username is already taken or is invalid</p>
                                            </div>
                    )}


                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder={'Password'} required/>
                    {warningPassword === 1 &&
                        (<p className={'warning'}>*Please enter a valid password to continue</p>)
                    }


                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'}
                           required/>
                    {warningEmail === 1 &&
                        (<p className={'warning'}>*Please enter a valid email to continue</p>)
                    }
                    {availabilityMessageE === 'yes'&& email.length > 0 &&(
                        <div className={'available'}>
                            <p> ☑️ email available</p>
                        </div>
                    )}
                    {availabilityMessageE === 'no'&& email.length>0 && (
                        <div className={'warning warning1'}>
                            <p> *email is already taken or is invalid</p>
                        </div>
                    )}


                </div>
                <div className={'signup-privacy'}>
                    <p>By clicking Sign Up you agree to our terms, conditions and our Privacy Policy</p>
                </div>
                <div className={'but3'} onClick={handleNext}>
                    <Link id={'signup-but'} to={'#'}>Next</Link>
                </div>

            </div>
            <div className={'lgin'}>
                <p>Already have an account? <Link to={'/'}>Log in</Link></p>
            </div>
        </>
    );
}

export default LogInStep1;
