import React from 'react';
import '../App.css'
import footer_appname from "../assets/footer_appname.png";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
function Footer() {
    const navigate = useNavigate()
    const handleSignUp  = () => {
        navigate('/sign-up')
    }
    const  goHome  = () => {
        navigate('/')
        
    }
    return (
        <>

            <footer >
                <div id={'footer-space'} className={'outcurve'}></div>
                <div id={'footer-con'}>
                    <div className={'footer-appname'}>
                        <img src={footer_appname}/>
                        <button className={'but2'} onClick={handleSignUp}>Sign-up</button>
                        <button className={'but2'} onClick={goHome}>Log-in</button>
                    </div>

                        <div className={'box2'}>
                            <p className={'linkss'}>What we do?</p><br/>
                            <Link className={'links'} to={'#'}>Features</Link>
                            <Link className={'links'} to={'#'}>Blog</Link>
                            <Link className={'links'} to={'#'}>Security</Link>
                            <Link className={'links'} to={'#'}>For Business</Link>
                        </div>
                        <div className={'box2'}>
                            <p className={'linkss'}>Who we are</p><br/>
                            <Link className={'links'} to={'#'}>About</Link>
                            <Link className={'links'} to={'#'}>Career</Link>
                            <Link className={'links'} to={'#'}>Brands</Link>
                            <Link className={'links'} to={'#'}>Privacy</Link>
                        </div>

                        <div className={'box2'}>
                            <p className={'linkss'}>Use ChatRoom</p><br/>
                            <Link className={'links'} to={'#'}>Android</Link>
                            <Link className={'links'} to={'#'}>iphone</Link>
                            <Link className={'links'} to={'#'}>Mac/Pc</Link>
                            <Link className={'links'} to={'#'}>ChatRoom Web</Link>
                        </div>
                        <div className={'box2'}>
                            <p className={'linkss'}>Need help?</p><br/>
                            <Link className={'links'} to={'#'}>Contact Us</Link>
                            <Link className={'links'} to={'#'}>Help Center</Link>
                            <Link className={'links'} to={'#'}>Download</Link>
                            <Link className={'links'} to={'#'}>Security</Link>

                        </div>

                    <div className={'footer-items1'}>
                        <div className={'box2-res'}>
                            <p className={'linkss'}>What we do?</p><br/>
                            <Link className={'links'} to={'#'}>Features</Link>
                            <Link className={'links'} to={'#'}>Blog</Link>
                            <Link className={'links'} to={'#'}>Security</Link>
                            <Link className={'links'} to={'#'}>For Business</Link>
                        </div>
                        <div className={'box2-res'}>
                            <p className={'linkss'}>Who we are</p><br/>
                            <Link className={'links'} to={'#'}>About</Link>
                            <Link className={'links'} to={'#'}>Career</Link>
                            <Link className={'links'} to={'#'}>Brands</Link>
                            <Link className={'links'} to={'#'}>Privacy</Link>
                        </div>
                    </div>
                    <div className={'footer-items2'}>
                        <div className={'box2-res'}>
                            <p className={'linkss'}>Use ChatRoom</p><br/>
                            <Link className={'links'} to={'#'}>Android</Link>
                            <Link className={'links'} to={'#'}>iphone</Link>
                            <Link className={'links'} to={'#'}>Mac/Pc</Link>
                            <Link className={'links'} to={'#'}>ChatRoom Web</Link>
                        </div>
                        <div className={'box2-res'}>
                            <p className={'linkss'}>Need help?</p><br/>
                            <Link className={'links'} to={'#'}>Contact Us</Link>
                            <Link className={'links'} to={'#'}>Help Center</Link>
                            <Link className={'links'} to={'#'}>Download</Link>
                            <Link className={'links'} to={'#'}>Security</Link>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
