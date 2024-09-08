import React from 'react';

function Hamburger({ isOpen }) {
    return (
        <>
            <div className="hamburger">
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
            <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
                <a href="/" className="menu-item">Home</a>
                <a href="/about" className="menu-item">About</a>
                <a href="/privacy" className="menu-item">Privacy</a>
                <a href="/contact" className="menu-item">Contact Us</a>
            </div>
            <style jsx>
                {`
                    
                    .burger1 {
                        transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                    }
                    .burger2 {
                        transform: ${isOpen ? 'translateX(100%)' : 'translateX(0)'};
                        opacity: ${isOpen ? 0 : 1};
                    }
                    .burger3 {
                        transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                    }
                    .hamburger-menu {
                        position: fixed;
                        top: 0;
                        right: 0;
                        height: 100%;
                        width: 70%;
                        background-color: white;
                        transform: translateX(100%);
                        transition: transform 0.3s ease-in-out;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
                    }
                    .hamburger-menu.open {
                        transform: translateX(0);
                    }
                    .menu-item {
                        padding: 1rem;
                        text-decoration: none;
                        color: black;
                        font-size: 1.5rem;
                        transition: color 0.3s ease;
                    }
                    .menu-item:hover {
                        color: gray;
                    }
                `}
            </style>
        </>
    );
}

export default Hamburger;
