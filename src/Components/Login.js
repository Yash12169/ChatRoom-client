// LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import phones from '../assets/phones.png';
import footer_appname from '../assets/footer_appname.png';
import or_icon from '../assets/or_icon.png';
import AndroidLarge from '../assets/AndroidLarge.png';
import Footer from "./Footer";
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/token/', {
                username,
                password,
            });
            // console.log(response.data['access'])
            // Assuming the response contains the access and refresh tokens
            const access_token = response.data['access'];
            const refresh_token = response.data['refresh'];
            console.log(access_token)
            console.log(refresh_token)
            setAccessToken(access_token);
            setRefreshToken(refresh_token);

            // Store the tokens in localStorage or a secure storage mechanism
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            if(access_token){
                navigate('/home')
            }

            // Optionally, you can trigger navigation or any other logic here
            // navigate('/dashboard'); // Example navigation

        } catch (error) {
            // Handle login error
            setLoginError('*Incorrect username or password please try again')
            console.error('Login failed', error);
        }
    };
    return (
        <div>

            <Navbar/>
            <div className={'parent'}>
                <div className={'container1'}>
                    <div className={'punchline'}>
                        <p>Empowering Conversations,<br/>
                            <span className={'animated-underline'}>No Boundaries</span>:<br/>
                            Where Privacy Meets Freedom!</p>
                    </div>
                    <div className={'description'}>
                        <p>A fun way to connect with family and friends without any<br/> restrictions or boundation</p>
                    </div>
                    <label>
                        <input
                            type="text"
                            value={username}
                            id={'username'}
                            placeholder={'Username or email address'}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                        <input
                            type="password"
                            id={'password'}
                            value={password}
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br/>
                    {loginError.length !== 0 && (
                        <div>
                            <p className={'error'}>{loginError}</p>
                        </div>
                    )}
                    <div className={'buttonbox'}>
                        <button onClick={handleSubmit} className={'but1'}>Log-in</button>
                        <button onClick={handleSubmit} className={'responsive-button'}>Log-in</button>
                        <Link to={'#'} id={'forgot'}>Forgotten your password?</Link>
                    </div>

                    <div className={'or_partition'}>
                        <img src={or_icon}/>
                    </div>
                    <div className={'signin'}>
                        <p>New to ChatRoom? sign up <Link id={'here'} to={'/sign-up'}>here</Link></p>
                    </div>
                </div>
                <div className={'description_mobile'}>
                    <p>A fun way to connect with family and friends without any<br/> restrictions or boundation</p>
                </div>
                <div className={'container2'}>
                    <img id={'devices'} src={phones}/>
                    <img id={'devices-small'} src={AndroidLarge}/>

                </div>


            </div>
            <Footer/>
        </div>
    );
};

export default LoginForm;
