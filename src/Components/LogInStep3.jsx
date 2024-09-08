import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Appname from "../assets/Appname.png";
import axios from "axios";
import {computeHeadingLevel} from "@testing-library/react";
import confirmation from '../assets/confirmaiton.jpeg'
import birthday from '../assets/birthday-cake.png'

function LogInStep3({userData}) {

    // const [about,setAbout] = useState('')
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);
    const [ registration,setRegistration ] = useState(false)
    const [Warning, setWarning] = useState('')
    const [underAgeWarning, setUnderAgeWarning] = useState('')
     const handleSignUp  = async () => {
        try{
            if(birthDate === null)
            {
                setWarning('*Please enter a valid age')
            }


            const currentDate = new Date();
            const inputDate = new Date(birthDate);
            const timeDiff = currentDate - inputDate;

            // Calculate age in years
            const ageInYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

            if(ageInYears<17){
                setWarning('*You must be above the age of 16 to use our services')
            }
            if(ageInYears<0){
                setWarning('*Invalid Age')
            }
            setAge(ageInYears);

            const completeUserData = {...userData.updatedUserData}
            console.log(completeUserData)
            // console.log(completeUserData.username)
            // console.log(completeUserData.password)
            // console.log(completeUserData.email)
            // console.log(completeUserData.about)
            // console.log(completeUserData.age)


            if(age!==null && age>16){
                setWarning('')
                console.log('signing up')
                await axios.post('http://localhost:8000/authentication/sign-up/' ,{username:completeUserData.username,password:completeUserData.password,email:completeUserData.email,about:completeUserData.about})
                setRegistration(true)
            }
        }

        catch (e){
            console.log(e)
            setWarning('*Please enter a valid age')
        }
     }


    return (
        <>
            {!registration && (
                <div>
                    <div className={'container-signup-2'}>
                        <div className={'birthday-cake'}>
                            <img src={birthday}/>
                            <p>Add your birthday</p>
                        </div>

                        <div className={'birthday'}>
                              <input type={"date"} value={birthDate} onChange={(e)=> setBirthDate(e.target.value)} required/>
                        </div>
                        {Warning !== '' && (
                            <div className={'warning'}>
                                <p>{Warning}</p>
                            </div>

                        )}
                        <div className={'age'}>
                            <p>We need your birthday for age verification and to ensure that you above the age limit to access the website</p>
                        </div>
                        <div className={'but3'}  onClick={handleSignUp}>
                            <Link id={'signup-but'} to={'#'}>Sign Up</Link>
                        </div>
                    </div>
                    <div className={'lgin margin-btm'}>
                        <p>Already have an account? <Link to={'/'}>Log in</Link></p>
                    </div>
                </div>
            )}
            {registration && (
                <div className={'container-signup-3'}>
                    <div className={'success-alert'}>
                        <p>  You are successfully registered now click <Link id={'link'} to={'/'}>here</Link> to login with your credentials</p>
                    </div>
                    <img src={confirmation}/>
                </div>
            )}
</>
)
    ;
}

export default LogInStep3;
