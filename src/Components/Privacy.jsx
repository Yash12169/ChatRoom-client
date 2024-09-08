import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Link} from "react-router-dom";

function Privacy() {
    return (
        <>
            <Navbar/>
            <div className="matter">
                <div className="mainhead">Privacy Policy</div>

                <div className="content">
                    Welcome to <span className={'primary-color'}>ChatRoom</span>. We are
                    committed to protecting your privacy and providing a safe and secure
                    user experience. This Privacy Policy outlines how we collect, use,
                    disclose, and protect your personal information when you use our
                    services.<br/><br/><br/>

                    <div className="heads ">Information We Collect</div>
                    <br/>

                    <span className={'bold'}>User-Provided Information:</span> We may collect information you provide
                    when you create an account, post content, communicate with other
                    users, or use our website's features. This may include your name,
                    email address, profile information, photos, and other content you
                    submit.
                    <br/><br/>
                    <span className={'bold'}>Automatically Collected Information:</span> We may collect
                    information automatically when you use our website. This may include
                    your IP address, device information, browser type, cookies, and usage
                    data.
                    <br/><br/><br/>
                    <div className="heads primary-color">How We Use Your Information</div>
                    <br/>
                    We use the information we collect for various purposes, including but
                    not limited to: <br/>
                    a. Providing, maintaining, and improving our services. <br/>
                    b. Personalizing your experience on our website. <br/>
                    c. Communicating with you, including responding to inquiries and providing updates. <br/>
                    d.Analyzing user behavior and trends to enhance our services. <br/>
                    e. Enforcing our terms of service and protecting the rights and safety of our users
                    and the community.<br/><br/><br/>
                    <div className="heads primary-color">Your Choices</div>
                    <br/>
                    You have choices regarding your personal information, including: <br/>a.
                    Access, review, and update your account information.<br/> b. Adjust your
                    privacy settings to control what information is visible to others. <br/>c.
                    Opt out of certain communications or data collection.<br/><br/><br/>
                    <div className="heads primary-color">Security</div>
                    <br/>
                    We take security measures to protect your personal information; however,
                    no method of transmission over the internet is entirely secure. We
                    encourage you to use strong, unique passwords and exercise caution when
                    sharing personal information.<br/><br/><br/>
                    <div className="heads primary-color">Children's Privacy</div>
                    <br/>
                    Our services are not intended for individuals under the age of 18. If you
                    believe we have collected information from a child under 18, please contact us.<br/><br/><br/>
                    <div className="heads primary-color">Changes to this Privacy Policy</div>
                    <br/>
                    We may update this Privacy Policy to reflect changes in our practices or for
                    other operational, legal, or regulatory reasons. We will notify you of any significant changes.
                    <br/><br/><br/>
                    <div className="heads primary-color">Contact Us</div>
                    <br/>
                    If you have questions, concerns, or requests regarding this Privacy Policy or
                    our practices, please contact us <Link to={'#'}>here</Link>.
                    <br/><br/><br/>
                </div>


            </div>





            <Footer/>
        </>
    );
}

export default Privacy;
