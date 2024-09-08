import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Appname from '../assets/Appname.png';
import insta from '../assets/insta.png';
import reddit from '../assets/reddit.png';
import x from '../assets/x.png';
import Hamburger from './Hamburger';

function Navbar() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <>
            <div className="nav-box">
                <div className="appname">
                    <Link to="/">
                        <img id="app" src={Appname} alt="App Name" />
                    </Link>
                </div>
                <div className="icons">
                    <Link to="/" className="buttons" id="home">Home</Link>
                    <Link to="/about" className="buttons" id="about">About</Link>
                    <Link to="/privacy" className="buttons" id="support">Privacy</Link>
                    <Link to="/contact" className="buttons" id="contact">Contact Us</Link>
                    <div className="social-media" id="social">
                        <img src={insta} id="insta" className="social" alt="Instagram" />
                        <img src={reddit} id="reddit" className="social" alt="Reddit" />
                        <img src={x} id="x" className="social" alt="X" />
                    </div>
                </div>
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
            </div>
        </>
    );
}

export default Navbar;
