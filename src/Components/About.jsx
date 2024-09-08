import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Link} from "react-router-dom";

function About() {
    return (
        <>
            <Navbar/>

            <div className="matter">
                <div className="mainhead">About Us</div>
                <div className="content">
                    Welcome to <span className={'primary-color'}>ChatRoom</span>, a platform committed to fostering open
                    and unrestricted communication while prioritizing
                    user privacy and minimal censorship.<br/>


                    <br/>
                    At <span className={'primary-color'}>ChatRoom</span>, we believe in providing a space for genuine
                    conversations without
                    unnecessary restrictions. Our mission is to empower users to connect, share ideas, and engage in
                    discussions freely, all while respecting individual privacy and promoting a diverse range of
                    perspectives.<br/><br/><br/>
                    <span className={'heads'}>Key Features</span><br/><br/>

                    <span className={'bold'}> Privacy First:</span> We prioritize user privacy by implementing robust
                    security measures and end-to-end
                    encryption to protect your conversations. Your data belongs to you, and we are committed to keeping
                    it secure.
                    <br/><br/>
                    <span className={'bold'}> Minimal Censorship:</span> We believe in freedom of expression. While we
                    have
                    community guidelines to
                    ensure a safe environment, we strive to keep censorship to a minimum, allowing users to express
                    themselves within the bounds of legality and ethical considerations.
                    <br/><br/>
                    <span className={'bold'}> User Empowerment:</span> You have the ability to control your experience.
                    Customize your chat settings,
                    manage your privacy preferences, and decide who can join your conversations.
                    <br/><br/><br/><span className={'heads'}>Guidelines</span> <br/><br/>

                    <span className={'bold'}>Respect Others:</span> Treat fellow users with kindness and respect. Harassment, hate speech, and any form
                    of harmful behavior are not tolerated.
                    <br/><br/>
                    <span className={'bold'}>Legal and Ethical Boundaries:</span> While we believe in open communication, we also expect users to adhere
                    to legal and ethical boundaries. Any content that violates applicable laws or ethical standards may
                    be subject to moderation.

                    <br/><br/><span className={'heads'}>Contact Us</span> <br/><br/>We value your feedback and input. If
                    you have any
                    questions, concerns, or suggestions, please don't hesitate to contact us <Link to={'/contact'}>here</Link>.

                    Thank you for being a part of the ChatRoom community!



                </div>
            </div>

            <Footer/>
        </>
    );
}

export default About;
