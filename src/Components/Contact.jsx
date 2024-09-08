import React, {useState} from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../App.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import contact from '../assets/contact.png'
import confirmation from "../assets/confirmaiton.jpeg";
function Contact() {
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [message,setMessage] = useState('')
    const [status,setStatus] = useState('')
    const navigate = useNavigate()

    const handleSubmit  =  () => {
        setFirstname('')
        setLastname('')
        setEmail('')
        setPhone('')
        setMessage('')
        setStatus('Your response had been recorded we will get back to you as soon as possible')
    }
    const handleClick  = () => {
        setStatus('')
        navigate('/')
    }



    return (
        <>
            <Navbar/>
            <div className={'parent-contact'}>
                {status.length === 0 && (
                    <div className="matter smallm">
                        <div className="mainhead">Contact Us</div>
                        <div className="content">
                            Thank you for reaching out to us! Please fill out the form below, and <br/>we'll get back to
                            you
                            as
                            soon as possible.
                            <br/><br/>
                            <div className="name">
                                <div className={'firstname'}>
                                    <label htmlFor={'firstname'}>First Name*</label>
                                    <input value={firstname} type={"text"} name={'firstname'}
                                           onChange={(e) => setFirstname(e.target.value)} required/>
                                </div>
                                <div className={'lastname'}>
                                    <label htmlFor={'lastname'}>Last Name*</label>
                                    <input type={"text"} name={'lastname'} onChange={(e) => setLastname(e.target.value)}
                                           value={lastname} required/>
                                </div>
                            </div>
                            <div className={'contact'}>

                                <div className={'email'}>
                                    <label htmlFor={'email'}>Email*</label>
                                    <input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email}
                                           name={'email'} required/>

                                </div>
                                <div className={'phone'}>
                                    <label htmlFor={'phone'}>Phone</label>
                                    <input type={"text"} onChange={(e) => setPhone(e.target.value)} value={phone}/>
                                </div>
                            </div>
                            <div className={'textarea'}>
                                <label htmlFor={'message'}>How may we help you?*</label>
                                <textarea placeholder={'message'} onChange={(e) => setMessage(e.target.value)}
                                          value={message}
                                          name={'message'}/>
                                <button className={'but1'} id={'formbutton'} onClick={handleSubmit} type="submit">Submit
                                </button>
                            </div>

                        </div>
                        <div className="content-mobile">
                            Thank you for reaching out to us! Please fill out the form below, and <br/>we'll get back to
                            you
                            as
                            soon as possible.
                            <br/><br/>

                            <div className={'firstname'}>
                                <label htmlFor={'firstname'}>First Name*</label>
                                <input value={firstname} type={"text"} name={'firstname'}
                                       onChange={(e) => setFirstname(e.target.value)} required/>
                            </div>
                            <div className={'lastname'}>
                                <label htmlFor={'lastname'}>Last Name*</label>
                                <input type={"text"} name={'lastname'} onChange={(e) => setLastname(e.target.value)}
                                       value={lastname} required/>
                            </div>


                            <div className={'email'}>
                                <label htmlFor={'email'}>Email*</label>
                                <input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email}
                                       name={'email'} required/>

                            </div>
                            <div className={'phone'}>
                                <label htmlFor={'phone'}>Phone</label>
                                <input type={"text"} onChange={(e) => setPhone(e.target.value)} value={phone}/>
                            </div>
                            <div className={'textarea'}>
                                <label htmlFor={'message'}>How may we help you?*</label>
                                <textarea placeholder={'message'} onChange={(e) => setMessage(e.target.value)}
                                          value={message}
                                          name={'message'}/>
                                <button className={'responsive-button responsive-button2'} id={'formbutton'}
                                        onClick={handleSubmit} type="submit">Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {status.length === 0 && (
                    <div className={'img-contact'}>
                        <img src={contact}/>
                    </div>
                )}
                {status.length > 0 && (
                    <div className={'container-signup-3'}>
                        <div className={'success-alert'}>
                            <p> Thank you for contacting us, your response has successfully been recorded we will get
                                back to
                                you as soon as possible.
                            </p>
                            <button onClick={handleClick} className={'contact-but'}>Ok</button>

                        </div>

                    </div>
                )}
            </div>

            <Footer/>
        </>
    );
}

export default Contact;
