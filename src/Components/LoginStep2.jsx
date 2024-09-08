import React, {useState} from 'react';
import Appname from "../assets/Appname.png";
import {Link} from "react-router-dom";
import people from '../assets/people.jpeg'
function LoginStep2({onNext,userData}) {
    const [about,setAbout] = useState('')
    const handleNext  =  () => {
        const updatedAbout = about.trim() === '' ? 'Have a nice day' : about;
        const updatedUserData = {...userData,about:updatedAbout}
        console.log(updatedUserData)
        onNext({updatedUserData})

    }

    return (
        <>
            <div className={'container-signup'}>
                <div className={'people'}>
                    <img src={people}/>
                </div>
                <div className={'page2-des'}>
                    <p id={'main-2'}>
                        Tell us something about Yourself
                    </p>
                    <p id={'shaded'}>
                        This will be displayed on your profile
                    </p>
                </div>
                <div className={'txt-about'}>
                    <textarea id={'abt-ta'} className={'txtar'} value={about} onChange={(e) => setAbout(e.target.value)}
                              placeholder={'Your interests ,Your hobbies ...'}
                    />
                </div>
                <div className={'signup-privacy'}>
                    <p>This can be changed later in your profile</p>
                </div>
                <div className={'but3 responsive-button3'} onClick={handleNext}>
                    <Link id={'signup-but'} to={'#'}>Next</Link>
                </div>

            </div>
            <div className={'lgin'}>
                <p>Already have an account? <Link to={'/'}>Log in</Link></p>
            </div>
        </>
    );
}

export default LoginStep2;
